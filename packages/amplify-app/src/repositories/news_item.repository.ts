import {getItemById, putItem, putItemBatchUnique, TABLES} from "../aws-utils/dynamodb";
import {CreateNewsItemInput, NewsItem} from "../API";

export function getNewsItemById(id: string): Promise<NewsItem> {
    return getItemById<NewsItem>(TABLES.NewsItem, id);
}

export function updateNewsItem(newsItem: NewsItem) {
    return putItem(TABLES.NewsItem, newsItem, "NewsItem");
}

export function createNewsItems(inputs: CreateNewsItemInput[]): Promise<NewsItem[]> {
    let inputsWithoutDuplicates = removeNewsItemInputItems(inputs);
    return putItemBatchUnique<NewsItem, CreateNewsItemInput>(TABLES.NewsItem, inputsWithoutDuplicates,"NewsItem", "id");
}
function removeNewsItemInputItems(items: CreateNewsItemInput[]): CreateNewsItemInput[] {
    return items.filter((item, index, self) => {
        return self.findIndex((i) => i.id === item.id) === index;
    });
}