'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
var crypto = require('crypto');
var RSSFeedParser = require('rss-parser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var RSSFeedParser__default = /*#__PURE__*/_interopDefaultLegacy(RSSFeedParser);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false,
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true,
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};
const docClient = new clientDynamodb.DynamoDBClient({});
const TABLES = {
    User: process.env.API_NEWSAGGREGATOR_USERTABLE_NAME,
    UserPublisherSubscription: process.env.API_NEWSAGGREGATOR_USERPUBLISHERSUBSCRIPTIONTABLE_NAME,
    Publisher: process.env.API_NEWSAGGREGATOR_PUBLISHERTABLE_NAME,
    Picture: process.env.API_NEWSAGGREGATOR_PICTURETABLE_NAME,
    PublisherSource: process.env.API_NEWSAGGREGATOR_PUBLISHERSOURCETABLE_NAME,
    NewsItem: process.env.API_NEWSAGGREGATOR_NEWSITEMTABLE_NAME,
};
console.log(TABLES);
function queryItems(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield docClient.send(new clientDynamodb.QueryCommand(params));
        return data.Items.map(item => utilDynamodb.unmarshall(item, unmarshallOptions));
    });
}
function createPutItemCommandParams(input, type, additionalParams = {}) {
    const item = Object.assign(Object.assign({ __typename: type, id: input.id || crypto.randomUUID() }, input), { createdAt: new Date().toISOString(), updatedAt: input.updatedAt || new Date().toISOString() });
    return Object.assign(Object.assign({}, additionalParams), { Item: utilDynamodb.marshall(item, marshallOptions) });
}
function putItemBatch(tableName, inputs, type, additionalParams = {}) {
    const items = inputs.map(input => createPutItemCommandParams(input, type, additionalParams));
    return batchWriteAll({
        RequestItems: {
            [tableName]: items.map(item => ({
                PutRequest: item
            }))
        }
    }).then(() => items.map(item => item.Item));
}
function putItemBatchUnique(tableName, inputs, type, conditionKey) {
    return __awaiter(this, void 0, void 0, function* () {
        return putItemBatch(tableName, inputs, type, {
            ConditionExpression: `attribute_not_exists(${conditionKey})`,
        });
    });
}
const batchWriteAll = (params) => {
    const batchSize = 15;
    let rawItems = [];
    Object.entries(params.RequestItems).forEach(([t, tv]) => {
        tv.forEach(o => {
            const operation = Object.keys(o)[0];
            const itemKey = operation === 'DeleteRequest' ? 'Key' : 'Item';
            rawItems.push({
                TableName: t,
                operation,
                [itemKey]: o[operation][itemKey]
            });
        });
    });
    const batchesArray = rawItems.reduce((acc, curr, i) => {
        if (!(i % batchSize)) {
            acc.push(rawItems.slice(i, i + batchSize));
        }
        return acc;
    }, []);
    return Promise.all(batchesArray.map(b => {
        let currentParams = {};
        b.forEach(i => {
            const itemKey = i.operation === 'DeleteRequest' ? 'Key' : 'Item';
            if (!currentParams[i.TableName])
                currentParams[i.TableName] = [];
            currentParams[i.TableName].push({ [i.operation]: { [itemKey]: i[itemKey] } });
        });
        return docClient.send(new clientDynamodb.BatchWriteItemCommand({ RequestItems: currentParams }));
    }));
};

function getAllPublisherSourcesByType(type) {
    return queryItems({
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
function getPublisherSourcesByTypeAndPublisher(type, publisherID) {
    return queryItems({
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

function createNewsItems(inputs) {
    let inputsWithoutDuplicates = removeNewsItemInputItems(inputs);
    return putItemBatchUnique(TABLES.NewsItem, inputsWithoutDuplicates, "NewsItem", "id");
}
function removeNewsItemInputItems(items) {
    return items.filter((item, index, self) => {
        return self.findIndex((i) => i.id === item.id) === index;
    });
}

/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
var SourceType;
(function (SourceType) {
    SourceType["CUSTOM"] = "CUSTOM";
    SourceType["RSS"] = "RSS";
    SourceType["YOUTUBE"] = "YOUTUBE";
    SourceType["TWITTER"] = "TWITTER";
    SourceType["ITUNES"] = "ITUNES";
    SourceType["WEBSITE"] = "WEBSITE";
})(SourceType || (SourceType = {}));
var TopicType;
(function (TopicType) {
    TopicType["GAMING"] = "GAMING";
    TopicType["TECH"] = "TECH";
    TopicType["DEV"] = "DEV";
    TopicType["CUSTOM"] = "CUSTOM";
})(TopicType || (TopicType = {}));
var PictureType;
(function (PictureType) {
    PictureType["AVATAR"] = "AVATAR";
    PictureType["COVER"] = "COVER";
})(PictureType || (PictureType = {}));
var ModelAttributeTypes;
(function (ModelAttributeTypes) {
    ModelAttributeTypes["binary"] = "binary";
    ModelAttributeTypes["binarySet"] = "binarySet";
    ModelAttributeTypes["bool"] = "bool";
    ModelAttributeTypes["list"] = "list";
    ModelAttributeTypes["map"] = "map";
    ModelAttributeTypes["number"] = "number";
    ModelAttributeTypes["numberSet"] = "numberSet";
    ModelAttributeTypes["string"] = "string";
    ModelAttributeTypes["stringSet"] = "stringSet";
    ModelAttributeTypes["_null"] = "_null";
})(ModelAttributeTypes || (ModelAttributeTypes = {}));
var SearchableNewsItemSortableFields;
(function (SearchableNewsItemSortableFields) {
    SearchableNewsItemSortableFields["id"] = "id";
    SearchableNewsItemSortableFields["title"] = "title";
    SearchableNewsItemSortableFields["description"] = "description";
    SearchableNewsItemSortableFields["publishedAt"] = "publishedAt";
    SearchableNewsItemSortableFields["createdAt"] = "createdAt";
    SearchableNewsItemSortableFields["updatedAt"] = "updatedAt";
    SearchableNewsItemSortableFields["coverID"] = "coverID";
    SearchableNewsItemSortableFields["publisherID"] = "publisherID";
    SearchableNewsItemSortableFields["topicID"] = "topicID";
    SearchableNewsItemSortableFields["viewsCount"] = "viewsCount";
})(SearchableNewsItemSortableFields || (SearchableNewsItemSortableFields = {}));
var SearchableSortDirection;
(function (SearchableSortDirection) {
    SearchableSortDirection["asc"] = "asc";
    SearchableSortDirection["desc"] = "desc";
})(SearchableSortDirection || (SearchableSortDirection = {}));
var SearchableAggregateType;
(function (SearchableAggregateType) {
    SearchableAggregateType["terms"] = "terms";
    SearchableAggregateType["avg"] = "avg";
    SearchableAggregateType["min"] = "min";
    SearchableAggregateType["max"] = "max";
    SearchableAggregateType["sum"] = "sum";
})(SearchableAggregateType || (SearchableAggregateType = {}));
var SearchableNewsItemAggregateField;
(function (SearchableNewsItemAggregateField) {
    SearchableNewsItemAggregateField["id"] = "id";
    SearchableNewsItemAggregateField["type"] = "type";
    SearchableNewsItemAggregateField["title"] = "title";
    SearchableNewsItemAggregateField["description"] = "description";
    SearchableNewsItemAggregateField["publishedAt"] = "publishedAt";
    SearchableNewsItemAggregateField["createdAt"] = "createdAt";
    SearchableNewsItemAggregateField["updatedAt"] = "updatedAt";
    SearchableNewsItemAggregateField["coverID"] = "coverID";
    SearchableNewsItemAggregateField["publisherID"] = "publisherID";
    SearchableNewsItemAggregateField["topicID"] = "topicID";
    SearchableNewsItemAggregateField["viewsCount"] = "viewsCount";
})(SearchableNewsItemAggregateField || (SearchableNewsItemAggregateField = {}));
var ModelSortDirection;
(function (ModelSortDirection) {
    ModelSortDirection["ASC"] = "ASC";
    ModelSortDirection["DESC"] = "DESC";
})(ModelSortDirection || (ModelSortDirection = {}));

class NewsItemRSS {
    constructor(data) {
        this.data = data;
    }
    static fromNewsFeedItem(item, source) {
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
    toInput() {
        const { title, description, publisherId, topicId, url, categories, author, publishedDate } = this.data;
        return {
            id: crypto.createHash('md5').update(url).digest("hex"),
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
        };
    }
}

// @ts-ignore
function parseRssFeed(url) {
    const parser = new RSSFeedParser__default["default"]();
    return parser.parseURL(url).then((feed) => {
        return feed;
    });
}

const INTERVAL_IN_MINUTES = 1440;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { detail, time } = event;
    const items = [];
    let intervalAmount = null;
    if (time) {
        console.log(`Interval time: ${time}`);
        intervalAmount = new Date(time);
        intervalAmount.setMinutes(intervalAmount.getMinutes() - INTERVAL_IN_MINUTES); // Filter news older than 10 minutes
    }
    try {
        let sources = [];
        if (detail === null || detail === void 0 ? void 0 : detail.publisherID) {
            console.log(`Getting all RSS resources by Publisher ID: ${detail.publisherID}`);
            sources = yield getPublisherSourcesByTypeAndPublisher(SourceType.RSS, detail.publisherID);
        }
        else {
            console.log(`Getting all RSS sources`);
            sources = yield getAllPublisherSourcesByType(SourceType.RSS);
        }
        yield Promise.all(sources.map((source) => __awaiter(void 0, void 0, void 0, function* () {
            const feed = yield parseRssFeed(source.rss.url);
            let feedItems = feed.items;
            console.log('Feed items count: ', feedItems.length);
            //TODO get amp URLs https://developers.google.com/amp/cache/reference/acceleratedmobilepageurl/rest/v1/ampUrls/batchGet
            if (intervalAmount) {
                feedItems = feedItems.filter((item) => {
                    console.log(intervalAmount, new Date(item.isoDate), new Date(item.isoDate) > intervalAmount);
                    return new Date(item.isoDate) > intervalAmount;
                });
            }
            feedItems.forEach((item) => {
                items.push(NewsItemRSS.fromNewsFeedItem(item, source));
            });
        })));
        console.log('Items to add count: ', items.length);
        yield createNewsItems(items.map(item => item.toInput()));
    }
    catch (error) {
        console.error(error);
        // create DLQ item
    }
    return null;
});

exports.handler = handler;
