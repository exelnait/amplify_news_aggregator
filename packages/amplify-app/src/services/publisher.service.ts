import {invokeLambda} from "../aws-utils/lambda";
import {IAggregateRSSFeedInvokeInput} from "../../amplify/backend/function/NewsAggregatorAggregateRSSFeed/src";

const FUNCTION_AGGREGATERSSFEED_NAME = process.env.FUNCTION_NEWSAGGREGATORAGGREGATERSSFEED_NAME
const FUNCTION_AGGREGATEITUNESFEED_NAME = process.env.FUNCTION_NEWSAGGREGATORAGGREGATEITUNESFEED_NAME
const FUNCTION_AGGREGATEYOUTUBEFEED_NAME = process.env.FUNCTION_NEWSAGGREGATORAGGREGATEYOUTUBEFEED_NAME

export function aggregateAllNewsItemsForPublisher(publisherID: string) {
    return invokeLambda<IAggregateRSSFeedInvokeInput, void>(FUNCTION_AGGREGATERSSFEED_NAME, {
        detail: {
            publisherID,
        }
    });
}