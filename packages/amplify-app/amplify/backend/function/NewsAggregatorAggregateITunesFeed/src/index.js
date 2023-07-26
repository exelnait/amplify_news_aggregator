'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
var crypto = require('crypto');
var xml2js = require('xml2js');
var axios = require('axios');

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

function parseITunesXMLFeed(feedUrl) {
    return axios__default["default"]({
        method: 'get',
        url: feedUrl
    }).then((response) => {
        if (response.status == 200) {
            return new Promise((resolve, reject) => {
                xml2js.parseString(response.data, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result['rss']['channel'][0]);
                    }
                });
            });
        }
    });
}

const linkifyHtml = require('linkify-html');
function normalizeITunesXMLFeedData(podcastsArray) {
    return podcastsArray.item.map((podcast) => {
        return {
            title: podcast.title ? podcast.title[0] : null,
            link: podcast.link ? podcast.link[0] : null,
            published_date: podcast.pubDate ? new Date(podcast.pubDate[0]).toISOString() : null,
            duration: normalizeDuration(podcast),
            keywords: normalizeKeywords(podcast),
            author: normalizeAuthor(podcast),
            audio_url: normalizeAudio(podcast),
            image: normalizeImage(podcast),
            description: normalizeDescription(podcast),
            description_html: normalizeDescriptionHTML(podcast),
            is_explicit: podcast['itunes:explicit'] ? podcast['itunes:explicit'][0] == 'yes' : false,
        };
    });
}
function normalizeDuration(podcast) {
    var duration = podcast['itunes:duration'] ? podcast['itunes:duration'][0] : null;
    if (duration && !duration.includes(':')) {
        duration = duration.substring(0, 2) + ':' + duration.substring(2, 4);
    }
    if (!duration) {
        duration = '00:00';
    }
    return duration;
}
function normalizeKeywords(podcast) {
    var keywords = null;
    if (podcast['itunes:keywords']) {
        keywords = podcast['itunes:keywords'][0];
    }
    if (keywords && keywords[0] == '') {
        keywords = null;
    }
    if (keywords) {
        keywords = keywords.replace(/,/g, ', ');
    }
    return keywords ? keywords.split(',') : [];
}
function normalizeAuthor(podcast) {
    var _a;
    let author = podcast['itunes:author'] ? podcast['itunes:author'][0] : null;
    if (!author) {
        author = (_a = podcast['author']) !== null && _a !== void 0 ? _a : null;
    }
    if (!author) {
        author = podcast['dc:creator'] ? podcast['dc:creator'][0] : null;
    }
    if (!author) {
        author = podcast['dc:author'] ? podcast['dc:author'][0] : null;
    }
    if (author && typeof author == 'object') {
        author = author[0];
    }
    return author;
}
function normalizeAudio(podcast) {
    var _a;
    let audio = podcast['enclosure'] ? podcast['enclosure'][0]['$'] : null;
    if ((_a = audio === null || audio === void 0 ? void 0 : audio.url) === null || _a === void 0 ? void 0 : _a.includes('?')) {
        return audio.url.substring(0, audio.url.indexOf('?'));
    }
    return audio === null || audio === void 0 ? void 0 : audio.url;
}
function normalizeDescription(podcast) {
    var description = podcast['itunes:summary'] ? podcast['itunes:summary'][0] : null;
    if (!description) {
        description = podcast['itunes:subtitle'] ? podcast['itunes:subtitle'][0] : null;
    }
    if (description && typeof description == 'object') {
        description = description[0];
    }
    return description ? linkifyHtml(description) : null;
}
function normalizeDescriptionHTML(podcast) {
    let description_html = null;
    if (podcast['content:encoded']) {
        description_html = podcast['content:encoded'][0];
    }
    else if (podcast['description']) {
        description_html = podcast['description'][0];
    }
    return description_html;
}
function normalizeImage(podcast) {
    let image = podcast['itunes:image'] ? podcast['itunes:image'][0]['$']['href'] : null;
    if (!image) {
        image = podcast['media:thumbnail'] ? podcast['media:thumbnail'][0]['$']['url'] : null;
    }
    return image;
}

class NewsItemITunes {
    constructor(data) {
        this.data = data;
    }
    static fromNormalizedITunesXMLItem(item, source) {
        return new NewsItemITunes({
            title: item.title,
            description: item.description,
            publisherId: source.publisherID,
            topicId: source.publisherTopicID,
            publishedDate: item.published_date,
            audioUrl: item.audio_url,
            coverUrl: item.image,
            durationFormatted: item.duration
        });
    }
    toInput() {
        const { title, description, publisherId, topicId, publishedDate, audioUrl, coverUrl, durationFormatted } = this.data;
        return {
            id: crypto.createHash('md5').update(audioUrl).digest("hex"),
            title,
            description,
            type: SourceType.ITUNES,
            publisherID: publisherId,
            topicID: topicId,
            publishedAt: publishedDate,
            itunes: {
                audioUrl,
                coverUrl,
                durationFormatted
            },
            viewsCount: 0,
        };
    }
}

const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const items = [];
    try {
        const sources = yield getAllPublisherSourcesByType(SourceType.ITUNES);
        yield Promise.all(sources.map((source) => __awaiter(void 0, void 0, void 0, function* () {
            // Fetch and parse the YouTube XML feed
            const feedData = yield parseITunesXMLFeed(source.itunes.url);
            const normalizedFeedItems = normalizeITunesXMLFeedData(feedData);
            normalizedFeedItems.forEach((item) => {
                items.push(NewsItemITunes.fromNormalizedITunesXMLItem(item, source));
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
