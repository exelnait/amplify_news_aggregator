import Parser from '@postlight/parser';
import {performance} from "perf_hooks";

interface IPostLightParserResponse {
    title: string;
    content: string;
    author: string;
    date_published: string;
    lead_image_url?: null;
    dek?: null;
    next_page_url?: null;
    url: string;
    domain: string;
    excerpt: string;
    word_count: number;
    direction: string;
    total_pages: number;
    rendered_pages: number;
}

export function parseArticle(url: string): Promise<IPostLightParserResponse> {
    const startTime = performance.now();
    return Parser.parse(url).then((response) => {
        console.log(`Parse article lambda time: ${performance.now() - startTime}ms`);
        return response;
    });
}
// TODO add custom parsers for specific websites
