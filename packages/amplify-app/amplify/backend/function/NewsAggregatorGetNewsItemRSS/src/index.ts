import type {AppSyncResolverHandler} from 'aws-lambda';

import {GetNewsItemRSSQueryVariables} from "../../../../../src/API";
import {getNewsItemById, updateNewsItem} from "../../../../../src/repositories/news_item.repository";
import {normalizeNewsItemFromRSS} from "../../../../../src/services/news.service";

export const handler: AppSyncResolverHandler<GetNewsItemRSSQueryVariables, any, any> = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
        const newsItem = await getNewsItemById(event.arguments.input.id);
        if (newsItem) {
            const updatedNewsItem = await normalizeNewsItemFromRSS(newsItem, {
                needToNormalizeContent: true,
            });
            await updateNewsItem(updatedNewsItem);

            return updatedNewsItem
        } else {
            throw new Error('NewsItem not found')
        }
    } catch (e) {
        throw new Error(e)
    }
};
