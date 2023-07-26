import {invokeLambda} from "../../aws-utils/lambda";
import {performance} from "perf_hooks";

const SCRAP_ARTICLE_LAMBDA_NAME = process.env.FUNCTION_NEWSAGGREGATORARTICLESCRAP_NAME

interface IScrapArticleLambdaPayload {
    arguments: {
        url: string
    }
}
interface IScrapArticleLambdaResponse {
    title: string
    text: string
    authors: string[]
    top_image: string
    publish_date?: string
    // NLP
    keywords: string[]
    summary: string
}
export function scrapArticle(url: string): Promise<IScrapArticleLambdaResponse> {
    const startTime = performance.now();
    return invokeLambda<IScrapArticleLambdaPayload, IScrapArticleLambdaResponse>(SCRAP_ARTICLE_LAMBDA_NAME, {
        arguments: {
            url
        }
    }).then((response) => {
        console.log(`Scrap article lambda time: ${performance.now() - startTime}ms`);
        return response
    });
}