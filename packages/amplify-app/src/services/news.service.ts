import {randomUUID} from "crypto";

import {NewsItem} from "../API";
import {scrapArticle} from "../utils/rss/article_scrapping";
import {parseArticle} from "../utils/rss/article_parsing";
import {calculateReadingTimeInMillisecondsByWordsCount, getDomain} from "../utils/rss/rss_utils";
import {normalizeHtml} from "../utils/rss/normalize_html";
import {convertHtmlToJson} from "../utils/rss/convert_html_to_json";
import {convertHtmlToText} from "../utils/rss/convert_html_to_text";
import {performance} from "perf_hooks";

interface NormalizeNewsItemOptions {
    needToNormalizeContent?: boolean
}

export async function normalizeNewsItemFromRSS(item: NewsItem, options: NormalizeNewsItemOptions = {
    needToNormalizeContent: false
}): Promise<NewsItem> {
    try {
        const startTime = performance.now();
        // const [scrapedArticle, parsedArticle] = await Promise.all([
        //     scrapArticle(item.rss.url),
        //     parseArticle(item.rss.url)
        // ]);
        const scrapedArticle = null;
        const parsedArticle = await  parseArticle(item.rss.url);
        const parsingTime = performance.now();
        console.log(`Parsing time: ${parsingTime - startTime}ms`);

        // console.log('scrapedArticle', JSON.stringify(scrapedArticle, null, 2));
        // console.log('parsedArticle', JSON.stringify(parsedArticle, null, 2));

        const coverUrl = parsedArticle.lead_image_url || scrapedArticle?.top_image;
        if (!item.coverID && coverUrl) {
            item.rss.coverUrl = coverUrl;
            item.coverID = randomUUID(); // S3 cover creation should be later
        }

        const normalizeContentTime = performance.now();
        const domain = getDomain(item.rss.url);
        const normalizedHtml = normalizeHtml({html: parsedArticle.content, domain, coverUrl: item.rss.coverUrl});
        const htmlJson = await convertHtmlToJson(normalizedHtml, {
            requestImageDimensions: true
        });
        item.rss.contentHtml = normalizedHtml
        item.rss.contentJson = JSON.stringify(htmlJson);
        item.rss.contentText = scrapedArticle?.text || parsedArticle.content ? convertHtmlToText(normalizedHtml) : null;
        item.rss.isScraped = true;
        console.log(`Normalize content time: ${normalizeContentTime - parsingTime}ms`);

        item.rss.wordsCount = item.rss.contentText ! + "" ? parsedArticle.word_count : 0;
        item.rss.readingDurationInMilliseconds = parsedArticle.word_count ? calculateReadingTimeInMillisecondsByWordsCount(parsedArticle.word_count) : 0;

        //NLP
        // item.rss.keywords = scrapedArticle.keywords
        // item.rss.summary = scrapedArticle.summary

        console.log(`Normalize news item time: ${performance.now() - startTime}ms`);
        return item;
    } catch (e) {
        console.log('normalizeNewsItemFromRSS Error', e.message);
        return null;
    }
}