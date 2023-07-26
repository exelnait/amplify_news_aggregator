import type {Handler} from 'aws-lambda';

import {getAllPublisherSourcesByType} from "../../../../../src/repositories/publisher.repository";
import {createNewsItems} from "../../../../../src/repositories/news_item.repository";
import {CreateNewsItemInput, SourceType} from "../../../../../src/API";
import {parseITunesXMLFeed} from "../../../../../src/utils/itunes/parse_itunes_xml";
import {normalizeITunesXMLFeedData} from "../../../../../src/utils/itunes/normalize_itunes_xml_data";
import {NewsItemITunes} from "../../../../../src/models/news_item_itunes";

export const handler:Handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const items: NewsItemITunes[] = [];

    try {
        const sources = await getAllPublisherSourcesByType(SourceType.ITUNES);

        await Promise.all(sources.map(async source => {
            // Fetch and parse the YouTube XML feed
            const feedData = await parseITunesXMLFeed(source.itunes.url);
            const normalizedFeedItems = normalizeITunesXMLFeedData(feedData);

            normalizedFeedItems.forEach((item) => {
                items.push(NewsItemITunes.fromNormalizedITunesXMLItem(item, source));
            })
        }));
        await createNewsItems(items.map(item => item.toInput()));
    } catch (error) {
        console.error(error);
        // create DLQ item
    }

    return null;
};