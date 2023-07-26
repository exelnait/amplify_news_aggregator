import {queryItems, putItem, TABLES, putItemBatch} from "../aws-utils/dynamodb";
import {CreatePublisherInput, CreatePublisherSourceInput, Publisher, PublisherSource, SourceType} from "../API";

export function createPublisher(input: CreatePublisherInput): Promise<Publisher> {
    return putItem<Publisher, CreatePublisherInput>(TABLES.Publisher, input, "Publisher");
}

export function getAllPublisherSourcesByType(type: SourceType): Promise<PublisherSource[]> {
    return queryItems<PublisherSource>({
        KeyConditionExpression: "#type = :type",
        ExpressionAttributeNames: { "#type": "type" },
        ExpressionAttributeValues: {
            ":type": { S: type },
            ":isHidden": { BOOL: false }
        },
        FilterExpression: "isHidden = :isHidden",
        IndexName: 'byType',
        TableName: TABLES.PublisherSource,
    });
}


export function getPublisherSourcesByTypeAndPublisher(type: SourceType, publisherID: string): Promise<PublisherSource[]> {
    return queryItems<PublisherSource>({
        KeyConditionExpression: "publisherID = :publisherID AND #type = :type",
        ExpressionAttributeNames: { "#type": "type" },
        ExpressionAttributeValues: {
            ":type": { S: type },
            ":publisherID": { S: publisherID },
            ":isHidden": { BOOL: false }
        },
        FilterExpression: "isHidden = :isHidden",
        IndexName: 'byPublisherAndType',
        TableName: TABLES.PublisherSource,
    });
}

export function createPublisherSources(inputs: CreatePublisherSourceInput[]): Promise<PublisherSource[]> {
    return putItemBatch<PublisherSource, CreatePublisherSourceInput>(TABLES.PublisherSource, inputs, "PublisherSource");
}