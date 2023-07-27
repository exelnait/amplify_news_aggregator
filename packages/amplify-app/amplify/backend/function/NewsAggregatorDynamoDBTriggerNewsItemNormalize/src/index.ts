import type {
  DynamoDBBatchResponse,
  DynamoDBStreamHandler,
  DynamoDBBatchItemFailure,
} from 'aws-lambda';
import type { AttributeValue } from '@aws-sdk/client-dynamodb';

import { unmarshall } from '@aws-sdk/util-dynamodb';

import { NewsItem, PictureType, SourceType } from '../../../../../src/API';
import { updateNewsItem } from '../../../../../src/repositories/news_item.repository';
import { normalizeNewsItemFromRSS } from '../../../../../src/services/news.service';
import { saveFileByUrl } from '../../../../../src/aws-utils/s3';
import { createPicture } from '../../../../../src/repositories/picture.repository';

export const handler: DynamoDBStreamHandler = async (
  event
): Promise<DynamoDBBatchResponse> => {
  const batchItemFailures: DynamoDBBatchItemFailure[] = [];

  const updatedNewsItems: NewsItem[] = [];

  console.log('Records Count: ' + event.Records.length);
  for (const record of event.Records) {
    if (record.eventName == 'INSERT') {
      console.log('DynamoDB Record: %j', record.dynamodb);
      const newsItem = unmarshall(
        record.dynamodb.NewImage as Record<string, AttributeValue>
      ) as NewsItem;

      try {
        let updatedNewsItem: NewsItem = null;
        switch (newsItem.type) {
          case SourceType.RSS:
            updatedNewsItem = await normalizeNewsItemFromRSS(newsItem);
            updatedNewsItems.push(updatedNewsItem);
            break;
        }
      } catch (e) {
        const curRecordSequenceNumber = record.dynamodb.SequenceNumber;
        batchItemFailures.push({ itemIdentifier: curRecordSequenceNumber });
      }
    }
  }

  await Promise.all([
    ...updatedNewsItems.map(updateNewsItem),
    ...updatedNewsItems.filter((item) => !!item.coverID).map(createCover),
  ]);

  return { batchItemFailures: batchItemFailures };
};

async function createCover(item: NewsItem): Promise<void> {
  const coverFile = await saveFileByUrl({
    url: item.rss.coverUrl,
    key: `public/news/${item.type.toLowerCase()}/${item.id}/cover`,
  });
  const coverPicture = await createPicture({
    id: item.coverID,
    type: PictureType.COVER,
    bucket: coverFile.bucket,
    key: coverFile.key,
  });
}
