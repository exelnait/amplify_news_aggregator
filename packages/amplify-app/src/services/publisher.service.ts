import { invokeLambda } from '../aws-utils/lambda';

import { IAggregateRSSFeedInvokeInput } from '../../amplify/backend/function/NewsAggregatorAggregateRSSFeed/src';
import { IAggregateYouTubeFeedInvokeInput } from '../../amplify/backend/function/NewsAggregatorAggregateYouTubeFeed/src';
import { IAggregateITunesFeedInvokeInput } from '../../amplify/backend/function/NewsAggregatorAggregateITunesFeed/src';
import { SourceType } from '../API';

const FUNCTION_AGGREGATERSSFEED_NAME =
  process.env.FUNCTION_NEWSAGGREGATORAGGREGATERSSFEED_NAME;
const FUNCTION_AGGREGATEITUNESFEED_NAME =
  process.env.FUNCTION_NEWSAGGREGATORAGGREGATEITUNESFEED_NAME;
const FUNCTION_AGGREGATEYOUTUBEFEED_NAME =
  process.env.FUNCTION_NEWSAGGREGATORAGGREGATEYOUTUBEFEED_NAME;

export function aggregateAllNewsItemsForPublisher(
  publisherID: string,
  sourcesToAggregate: SourceType[]
) {
  return Promise.all(
    sourcesToAggregate.map((sourceType) => {
      switch (sourceType) {
        case SourceType.RSS:
          return invokeAggregateRSSLambda(publisherID);
        case SourceType.ITUNES:
          return invokeAggregateITunesLambda(publisherID);
        case SourceType.YOUTUBE:
          return invokeAggregateYouTubeLambda(publisherID);
        default:
          console.error(`Source type ${sourceType} is not supported`);
          return Promise.resolve();
      }
    })
  );
}

function invokeAggregateRSSLambda(publsiherID: string) {
  return invokeLambda<IAggregateRSSFeedInvokeInput, void>(
    FUNCTION_AGGREGATERSSFEED_NAME,
    {
      detail: {
        publisherID: publsiherID,
      },
    }
  );
}

function invokeAggregateYouTubeLambda(publsiherID: string) {
  return invokeLambda<IAggregateYouTubeFeedInvokeInput, void>(
    FUNCTION_AGGREGATEYOUTUBEFEED_NAME,
    {
      detail: {
        publisherID: publsiherID,
      },
    }
  );
}

function invokeAggregateITunesLambda(publsiherID: string) {
  return invokeLambda<IAggregateITunesFeedInvokeInput, void>(
    FUNCTION_AGGREGATEITUNESFEED_NAME,
    {
      detail: {
        publisherID: publsiherID,
      },
    }
  );
}
