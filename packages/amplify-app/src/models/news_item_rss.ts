import type {Item} from "rss-parser";

import {createHash} from "crypto";

import {CreateNewsItemInput, NewsItem, PublisherSource, SourceType} from "../API";

interface INewsItemRSSData {
    title: string;
    description: string;
    publisherId: string;
    topicId: string;
    publishedDate: string;
    url: string;
    categories: string[];
    author: string;
}

export class NewsItemRSS {

    data: INewsItemRSSData

    constructor(data: INewsItemRSSData) {
       this.data = data;
    }

    static fromNewsFeedItem(item: Item, source: PublisherSource): NewsItemRSS {
        return new NewsItemRSS({
            title: item.title,
            description: item.contentSnippet,
            publisherId: source.publisherID,
            topicId: source.publisherTopicID,
            publishedDate: item.isoDate,
            url: item.link,
            categories: item.categories,
            author: item.creator,
        });
    }

    toInput(): CreateNewsItemInput {
        const {title, description, publisherId, topicId, url, categories, author, publishedDate} = this.data;
        return {
            id: createHash('md5').update(url).digest("hex"),
            title,
            description,
            type: SourceType.RSS,
            publisherID: publisherId,
            topicID: topicId,
            publishedAt: publishedDate,
            rss: {
                isScraped: false,
                url,
                categories,
                author,
            },
            viewsCount: 0,
        }
    }
}