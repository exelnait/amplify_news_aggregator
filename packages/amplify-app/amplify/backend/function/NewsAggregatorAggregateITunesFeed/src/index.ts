import { ScheduledEvent, ScheduledHandler } from 'aws-lambda';

import {
  getAllPublisherSourcesByType,
  getPublisherSourcesByTypeAndPublisher,
} from '../../../../../src/repositories/publisher.repository';
import { createNewsItems } from '../../../../../src/repositories/news_item.repository';
import { SourceType } from '../../../../../src/API';
import { parseITunesXMLFeed } from '../../../../../src/utils/itunes/parse_itunes_xml';
import { normalizeITunesXMLFeedData } from '../../../../../src/utils/itunes/normalize_itunes_xml_data';
import { NewsItemITunes } from '../../../../../src/models/news_item_itunes';

interface IAggregateITunesFeedDetail {
  publisherID?: string;
}

const INTERVAL_IN_MINUTES = 1440;

export type IAggregateITunesFeedInvokeInput = Partial<
  ScheduledEvent<IAggregateITunesFeedDetail>
>;

export const handler: ScheduledHandler<IAggregateITunesFeedDetail> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { detail, time } = event;

  const items: NewsItemITunes[] = [];

  let intervalAmount = null;
  if (time) {
    console.log(`Interval time: ${time}`);
    intervalAmount = new Date(time);
    intervalAmount.setMinutes(
      intervalAmount.getMinutes() - INTERVAL_IN_MINUTES
    ); // Filter news older than 10 minutes
  }
  try {
    let sources = [];
    if (detail?.publisherID) {
      console.log(
        `Getting all ITunes resources by Publisher ID: ${detail.publisherID}`
      );
      sources = await getPublisherSourcesByTypeAndPublisher(
        SourceType.ITUNES,
        detail.publisherID
      );
    } else {
      console.log(`Getting all ITunes sources`);
      sources = await getAllPublisherSourcesByType(SourceType.ITUNES);
    }

    await Promise.all(
      sources.map(async (source) => {
        // Fetch and parse the ITunes XML feed
        const feedItems = await parseITunesXMLFeed(source.itunes.url);
        let normalizedFeedItems = normalizeITunesXMLFeedData(feedItems);

        if (intervalAmount) {
          normalizedFeedItems = normalizedFeedItems.filter((item) => {
            console.log(
              intervalAmount,
              new Date(item.published_date),
              new Date(item.published_date) > intervalAmount
            );
            return new Date(item.published_date) > intervalAmount;
          });
        }

        normalizedFeedItems.forEach((item) => {
          items.push(NewsItemITunes.fromNormalizedITunesXMLItem(item, source));
        });
      })
    );
    await createNewsItems(items.map((item) => item.toInput()));
  } catch (error) {
    console.error(error);
    // TODO: create DLQ item
  }

  return null;
};
