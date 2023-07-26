import type {Handler} from 'aws-lambda';

import {getAllPublisherSourcesByType} from "../../../../../src/repositories/publisher.repository";
import {createNewsItems} from "../../../../../src/repositories/news_item.repository";
import {NewsItemYouTube} from "../../../../../src/models/news_item_youtube";
import {SourceType} from "../../../../../src/API";
import {parseYouTubeXMLFeed} from "../../../../../src/utils/youtube/parse_youtube_xml";
import {normalizeYouTubeXMLFeedData} from "../../../../../src/utils/youtube/normalize_youtube_xml_video_data";

export const handler:Handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const items: NewsItemYouTube[] = [];

    try {
        const sources = await getAllPublisherSourcesByType(SourceType.YOUTUBE);

        await Promise.all(sources.map(async source => {
            // Fetch and parse the YouTube XML feed
            const feed = await parseYouTubeXMLFeed(source.youtube.channelID);
            const feedItems = feed.entry;
            const normalizedFeedItems = normalizeYouTubeXMLFeedData(feedItems);

            normalizedFeedItems.forEach((item) => {
                items.push(NewsItemYouTube.fromNormalizedYouTubeXMLItem(item, source));
            })
        }));

        await createNewsItems(items.map(item => item.toInput()));
    } catch (error) {
        console.error(error);
        // create DLQ item
    }

    return null;
};