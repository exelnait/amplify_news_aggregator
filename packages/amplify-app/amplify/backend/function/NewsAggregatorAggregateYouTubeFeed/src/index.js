'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
var crypto = require('crypto');
var xml2js = require('xml2js');
var axios = require('axios');
var htmlToText = require('html-to-text');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

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
    Publisher: process.env.API_NEWSAGGREGATOR_PUBLISHERTABLE_NAME,
    Picture: process.env.API_NEWSAGGREGATOR_PICTURETABLE_NAME,
    PublisherSource: process.env.API_NEWSAGGREGATOR_PUBLISHERSOURCETABLE_NAME,
    NewsItem: process.env.API_NEWSAGGREGATOR_NEWSITEMTABLE_NAME,
};
console.log(TABLES);
function queryItems(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield docClient.send(new clientDynamodb.QueryCommand(params));
        return data.Items.map((item) => utilDynamodb.unmarshall(item, unmarshallOptions));
    });
}
function createPutItemCommandParams(input, type, additionalParams = {}) {
    const item = Object.assign(Object.assign({ __typename: type, id: input.id || crypto.randomUUID() }, input), { createdAt: new Date().toISOString(), updatedAt: input.updatedAt || new Date().toISOString() });
    return Object.assign(Object.assign({}, additionalParams), { Item: utilDynamodb.marshall(item, marshallOptions) });
}
function putItemBatch(tableName, inputs, type, additionalParams = {}) {
    const items = inputs.map((input) => createPutItemCommandParams(input, type, additionalParams));
    return batchWriteAll({
        RequestItems: {
            [tableName]: items.map((item) => ({
                PutRequest: item,
            })),
        },
    }).then(() => items.map((item) => item.Item));
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
        tv.forEach((o) => {
            const operation = Object.keys(o)[0];
            const itemKey = operation === 'DeleteRequest' ? 'Key' : 'Item';
            rawItems.push({
                TableName: t,
                operation,
                [itemKey]: o[operation][itemKey],
            });
        });
    });
    const batchesArray = rawItems.reduce((acc, curr, i) => {
        if (!(i % batchSize)) {
            acc.push(rawItems.slice(i, i + batchSize));
        }
        return acc;
    }, []);
    return Promise.all(batchesArray.map((b) => {
        let currentParams = {};
        b.forEach((i) => {
            const itemKey = i.operation === 'DeleteRequest' ? 'Key' : 'Item';
            if (!currentParams[i.TableName])
                currentParams[i.TableName] = [];
            currentParams[i.TableName].push({
                [i.operation]: { [itemKey]: i[itemKey] },
            });
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
    SearchableNewsItemSortableFields["creatorID"] = "creatorID";
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
    SearchableNewsItemAggregateField["creatorID"] = "creatorID";
})(SearchableNewsItemAggregateField || (SearchableNewsItemAggregateField = {}));
var ModelSortDirection;
(function (ModelSortDirection) {
    ModelSortDirection["ASC"] = "ASC";
    ModelSortDirection["DESC"] = "DESC";
})(ModelSortDirection || (ModelSortDirection = {}));

class NewsItemYouTube {
    constructor(data) {
        this.data = data;
    }
    static fromNormalizedYouTubeXMLItem(item, source) {
        return new NewsItemYouTube({
            title: item.title,
            description: item.description,
            publisherId: source.publisherID,
            creatorId: source.creatorID,
            topicId: source.publisherTopicID,
            publishedDate: item.published_date,
            videoId: item.video_id,
            coverUrl: item.cover,
        });
    }
    toInput() {
        const { title, description, publisherId, creatorId, topicId, publishedDate, videoId, coverUrl, } = this.data;
        return {
            id: crypto.createHash('md5').update(videoId).digest('hex'),
            title,
            description,
            type: SourceType.YOUTUBE,
            publisherID: publisherId,
            topicID: topicId,
            publishedAt: publishedDate,
            youtube: {
                videoId,
                coverUrl,
            },
            creatorID: creatorId,
        };
    }
}

function parseYouTubeXMLFeed(youtubeChannelId) {
    const url = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + youtubeChannelId;
    return axios__default["default"]({
        method: 'get',
        url
    }).then((response) => {
        if (response.status == 200) {
            return new Promise((resolve, reject) => {
                xml2js.parseString(response.data, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result['feed']);
                    }
                });
            });
        }
    });
}

function convertHtmlToText(html) {
    return htmlToText.convert(html, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
        singleNewLineParagraphs: true
    }).replace(/\[.+?\]/g, '');
}

const linkifyHtml = require('linkify-html');
function normalizeYouTubeXMLFeedData(videosArray) {
    return videosArray.map((video) => {
        const description_html = normalizeYouTubeXMLDescription(video['media:group'][0]['media:description'][0]);
        return {
            title: video['title'][0],
            cover: video['media:group'][0]['media:thumbnail'][0]['$'].url,
            video_id: video['yt:videoId'][0],
            author: video['author'][0].name[0],
            channel_id: video['yt:channelId'][0],
            description: convertHtmlToText(description_html),
            description_html,
            published_date: video['published'][0]
        };
    });
}
function normalizeYouTubeXMLDescription(description) {
    let result = '';
    description.split('\n').forEach((string) => {
        if (string.search('vk') < 0
            || string.search('twitter') < 0
            || string.search('facebook') < 0
            || string.search('youtube') < 0
            || string.search('goo.gl') < 0
            || string.search('plus.google') < 0) {
            result += string + '<br/>';
        }
    });
    return linkifyHtml(result);
}

const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const items = [];
    try {
        const sources = yield getAllPublisherSourcesByType(SourceType.YOUTUBE);
        yield Promise.all(sources.map((source) => __awaiter(void 0, void 0, void 0, function* () {
            // Fetch and parse the YouTube XML feed
            const feed = yield parseYouTubeXMLFeed(source.youtube.channelID);
            const feedItems = feed.entry;
            const normalizedFeedItems = normalizeYouTubeXMLFeedData(feedItems);
            normalizedFeedItems.forEach((item) => {
                items.push(NewsItemYouTube.fromNormalizedYouTubeXMLItem(item, source));
            });
        })));
        yield createNewsItems(items.map(item => item.toInput()));
    }
    catch (error) {
        console.error(error);
        // create DLQ item
    }
    return null;
});

exports.handler = handler;
