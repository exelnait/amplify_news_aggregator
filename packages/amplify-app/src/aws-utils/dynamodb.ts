import {
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
    ScanCommandInput,
    QueryCommandInput,
    PutItemCommandInput, BatchWriteItemCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {randomUUID} from "crypto";
import {BatchWriteItemCommandInput} from "@aws-sdk/client-dynamodb/dist-types/commands/BatchWriteItemCommand";
import {GetCommand, GetCommandInput} from "@aws-sdk/lib-dynamodb";

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const docClient = new DynamoDBClient({});

export const TABLES = {
    User: process.env.API_NEWSAGGREGATOR_USERTABLE_NAME,
    UserPublisherSubscription: process.env.API_NEWSAGGREGATOR_USERPUBLISHERSUBSCRIPTIONTABLE_NAME,
    Publisher: process.env.API_NEWSAGGREGATOR_PUBLISHERTABLE_NAME,
    Picture: process.env.API_NEWSAGGREGATOR_PICTURETABLE_NAME,
    PublisherSource: process.env.API_NEWSAGGREGATOR_PUBLISHERSOURCETABLE_NAME,
    NewsItem: process.env.API_NEWSAGGREGATOR_NEWSITEMTABLE_NAME,
}
console.log(TABLES);

interface IDefaultInput {
    id?: string
    createdAt?: string
    updatedAt?: string
}

export async function getItem<T>(params: QueryCommandInput): Promise<T> {
    const data = await docClient.send(new QueryCommand(params));
    if (data.Items[0]) {
        return unmarshall(data.Items[0], unmarshallOptions) as T;
    }
    return null;
}
export async function getItemById<T>(tableName: string, id: string): Promise<T> {
    const params: QueryCommandInput = {
        TableName: TABLES.NewsItem,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {":id": {"S": id}}
    }
    return getItem<T>(params);
}

export async function queryItems<T>(params: QueryCommandInput): Promise<T[]> {
    const data = await docClient.send(new QueryCommand(params));
    return data.Items.map(item => unmarshall(item, unmarshallOptions)) as T[];
}

export async function scanItems<T>(params: ScanCommandInput): Promise<T[]> {
    const data = await docClient.send(new QueryCommand(params));
    return data.Items.map(item => unmarshall(item, unmarshallOptions)) as T[];
}

function createPutItemCommandParams<I extends IDefaultInput>(input: I, type: string,  additionalParams: Partial<PutItemCommandInput> = {}) {
    const item = {
        __typename: type,
        id: input.id || randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: input.updatedAt || new Date().toISOString()
    }
    return {
        ...additionalParams,
        Item: marshall(item, marshallOptions),
    }
}

export async function putItem<T, I extends IDefaultInput>(tableName: string, input: I, type: string,  additionalParams: Partial<PutItemCommandInput> = {}): Promise<T>{
    const params = createPutItemCommandParams<I>(input, type, additionalParams);
    console.log(`Putting item: ${JSON.stringify(params, null, 2)}`);
    await docClient.send(new PutItemCommand({
        TableName : tableName,
        ...params
    }));
    return unmarshall(params.Item) as T;
}

export async function putItemUnique<T, I extends IDefaultInput>(tableName: string, input: I, type: string,  conditionKey: string): Promise<T>{
    return putItem<T, I>(tableName, input,type, {
        ConditionExpression: `attribute_not_exists(${conditionKey})`,
    });
}

export function putItemBatch<T, I extends IDefaultInput>(tableName: string, inputs: I[], type: string, additionalParams: { ConditionExpression?: string } = {}): Promise<T[]> {
    const items = inputs.map(input => createPutItemCommandParams<I>(input, type, additionalParams));
    return batchWriteAll({
        RequestItems: {
            [tableName]: items.map(item => ({
                PutRequest: item
            }))
        }
    }).then(() => items.map(item => item.Item as T));
}

export async function putItemBatchUnique<T, I extends IDefaultInput>(tableName: string, inputs: I[], type: string,  conditionKey: string): Promise<T[]>{
    return putItemBatch<T, I>(tableName, inputs,type, {
        ConditionExpression: `attribute_not_exists(${conditionKey})`,
    });
}

const batchWriteAll = (params: BatchWriteItemCommandInput) => {
    const batchSize = 15;
    let rawItems = []
    Object.entries(params.RequestItems).forEach(([t, tv]) => {
        tv.forEach(o => {
            const operation = Object.keys(o)[0];
            const itemKey = operation === 'DeleteRequest' ? 'Key' : 'Item'
            rawItems.push({
                TableName: t,
                operation,
                [itemKey]: o[operation][itemKey]
            })
        })
    })

    const batchesArray = rawItems.reduce((acc, curr, i) => {
        if (!(i % batchSize)) {
            acc.push(rawItems.slice(i, i + batchSize));
        }
        return acc;
    }, []);

    return Promise.all(batchesArray.map(b => {
        let currentParams = {};
        b.forEach(i => {
            const itemKey = i.operation === 'DeleteRequest' ? 'Key' : 'Item'
            if (!currentParams[i.TableName]) currentParams[i.TableName] = [];
            currentParams[i.TableName].push({[i.operation]: {[itemKey]: i[itemKey]}});
        });

        return docClient.send(new BatchWriteItemCommand({RequestItems: currentParams}));
    }))
}
