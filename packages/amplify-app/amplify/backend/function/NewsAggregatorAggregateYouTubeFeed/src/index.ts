import { ScheduledEvent, ScheduledHandler } from 'aws-lambda';

import {
  getAllPublisherSourcesByType,
  getPublisherSourcesByTypeAndPublisher,
} from '../../../../../src/repositories/publisher.repository';
import { createNewsItems } from '../../../../../src/repositories/news_item.repository';
import { NewsItemYouTube } from '../../../../../src/models/news_item_youtube';
import { SourceType } from '../../../../../src/API';
import { parseYouTubeXMLFeed } from '../../../../../src/utils/youtube/parse_youtube_xml';
import { normalizeYouTubeXMLFeedData } from '../../../../../src/utils/youtube/normalize_youtube_xml_video_data';

interface IAggregateYouTubeFeedDetail {
  publisherID?: string;
}

const INTERVAL_IN_MINUTES = 1440;

export type IAggregateYouTubeFeedInvokeInput = Partial<
  ScheduledEvent<IAggregateYouTubeFeedDetail>
>;

export const handler: ScheduledHandler<IAggregateYouTubeFeedDetail> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { detail, time } = event;

  const items: NewsItemYouTube[] = [];

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
        `Getting all YouTube resources by Publisher ID: ${detail.publisherID}`
      );
      sources = await getPublisherSourcesByTypeAndPublisher(
        SourceType.YOUTUBE,
        detail.publisherID
      );
    } else {
      console.log(`Getting YouTube RSS sources`);
      sources = await getAllPublisherSourcesByType(SourceType.YOUTUBE);
    }

    await Promise.all(
      sources.map(async (source) => {
        // Fetch and parse the YouTube XML feed
        const feed = await parseYouTubeXMLFeed(source.youtube.channelID);
        const feedItems = feed.entry;
        let normalizedFeedItems = normalizeYouTubeXMLFeedData(feedItems);

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
          items.push(
            NewsItemYouTube.fromNormalizedYouTubeXMLItem(item, source)
          );
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
