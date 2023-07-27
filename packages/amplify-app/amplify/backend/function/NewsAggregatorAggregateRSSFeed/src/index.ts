import type { ScheduledHandler, ScheduledEvent } from 'aws-lambda';

import {
  getAllPublisherSourcesByType,
  getPublisherSourcesByTypeAndPublisher,
} from '../../../../../src/repositories/publisher.repository';
import { createNewsItems } from '../../../../../src/repositories/news_item.repository';
import { NewsItemRSS } from '../../../../../src/models/news_item_rss';
import { parseRssFeed } from '../../../../../src/utils/rss/parse_feed';
import { SourceType } from '../../../../../src/API';

const INTERVAL_IN_MINUTES = 1440;

interface IAggregateRSSFeedDetail {
  publisherID?: string;
}

export type IAggregateRSSFeedInvokeInput = Partial<
  ScheduledEvent<IAggregateRSSFeedDetail>
>;

export const handler: ScheduledHandler<IAggregateRSSFeedDetail> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { detail, time } = event;

  const items: NewsItemRSS[] = [];

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
        `Getting all RSS resources by Publisher ID: ${detail.publisherID}`
      );
      sources = await getPublisherSourcesByTypeAndPublisher(
        SourceType.RSS,
        detail.publisherID
      );
    } else {
      console.log(`Getting all RSS sources`);
      sources = await getAllPublisherSourcesByType(SourceType.RSS);
    }

    await Promise.all(
      sources.map(async (source) => {
        const feed = await parseRssFeed(source.rss.url);
        let feedItems = feed.items;

        console.log('Feed items count: ', feedItems.length);

        //TODO get amp URLs https://developers.google.com/amp/cache/reference/acceleratedmobilepageurl/rest/v1/ampUrls/batchGet

        if (intervalAmount) {
          feedItems = feedItems.filter((item) => {
            console.log(
              intervalAmount,
              new Date(item.isoDate),
              new Date(item.isoDate) > intervalAmount
            );
            return new Date(item.isoDate) > intervalAmount;
          });
        }
        feedItems.forEach((item) => {
          items.push(NewsItemRSS.fromNewsFeedItem(item, source));
        });
      })
    );
    console.log('Items to add count: ', items.length);
    await createNewsItems(items.map((item) => item.toInput()));
  } catch (error) {
    console.error(error);
    // TODO: create DLQ item
  }

  return null;
};
