import type {Item, Output} from "rss-parser";
// @ts-ignore
import {default as RSSFeedParser} from "rss-parser";

export function parseRssFeed(url: string): Promise<Output<Item>> {
    const parser = new RSSFeedParser();
    return parser.parseURL(url).then((feed) => {
        return feed
    });
}