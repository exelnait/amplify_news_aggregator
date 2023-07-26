'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crypto = require('crypto');
var clientS3 = require('@aws-sdk/client-s3');
var axios$1 = require('axios');
var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
var RSSFeedParser = require('rss-parser');
var clientLambda = require('@aws-sdk/client-lambda');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios$1);
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

function downloadFileFromURL(fileUrl) {
    return axios__default["default"]({
        method: 'get',
        url: fileUrl,
        responseType: 'arraybuffer'
    }).then((response) => Buffer.from(response.data, 'binary'));
}

const BUCKET = process.env.STORAGE_NEWSAGGREGATORSTORAGE_BUCKETNAME;
const s3 = new clientS3.S3({});
function saveFileByUrl({ url, key }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!BUCKET) {
            throw new Error('BUCKET is not defined');
        }
        const buffer = yield downloadFileFromURL(url);
        if (buffer) {
            yield s3.putObject({ Bucket: BUCKET, Key: key, Body: buffer });
            return {
                bucket: BUCKET,
                key,
            };
        }
        else {
            throw new Error('File is empty');
        }
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
function scanItems(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield docClient.send(new clientDynamodb.ScanCommand(params));
        return data.Items.map((item) => utilDynamodb.unmarshall(item, unmarshallOptions));
    });
}
function createPutItemCommandParams(input, type, additionalParams = {}) {
    const item = Object.assign(Object.assign({ __typename: type, id: input.id || crypto.randomUUID() }, input), { createdAt: new Date().toISOString(), updatedAt: input.updatedAt || new Date().toISOString() });
    return Object.assign(Object.assign({}, additionalParams), { Item: utilDynamodb.marshall(item, marshallOptions) });
}
function putItem(tableName, input, type, additionalParams = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = createPutItemCommandParams(input, type, additionalParams);
        console.log(`Putting item: ${JSON.stringify(params, null, 2)}`);
        yield docClient.send(new clientDynamodb.PutItemCommand(Object.assign({ TableName: tableName }, params)));
        return utilDynamodb.unmarshall(params.Item);
    });
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

function createPublisher(input) {
    return putItem(TABLES.Publisher, input, "Publisher");
}
function createPublisherSources(inputs) {
    return putItemBatch(TABLES.PublisherSource, inputs, "PublisherSource");
}

function createPicture(input) {
    return putItem(TABLES.Picture, input, "Picture");
}

// @ts-ignore
function parseRssFeed(url) {
    const parser = new RSSFeedParser__default["default"]();
    return parser.parseURL(url).then((feed) => {
        return feed;
    });
}

const client = new clientLambda.LambdaClient({});
function invokeLambda(name, input, invocationType = clientLambda.InvocationType.RequestResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new clientLambda.InvokeCommand({
            FunctionName: name,
            Payload: jsonToUint8Array(input),
            InvocationType: invocationType
        });
        const response = yield client.send(command);
        return uint8ArrayToJSON(response.Payload);
    });
}
// Convert string to uint8Array
function jsonToUint8Array(data) {
    const encoder = new TextEncoder();
    return encoder.encode(JSON.stringify(data));
}
function uint8ArrayToJSON(array) {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(array));
}

const FUNCTION_AGGREGATERSSFEED_NAME = process.env.FUNCTION_NEWSAGGREGATORAGGREGATERSSFEED_NAME;
process.env.FUNCTION_NEWSAGGREGATORAGGREGATEITUNESFEED_NAME;
process.env.FUNCTION_NEWSAGGREGATORAGGREGATEYOUTUBEFEED_NAME;
function aggregateAllNewsItemsForPublisher(publisherID) {
    return invokeLambda(FUNCTION_AGGREGATERSSFEED_NAME, {
        detail: {
            publisherID,
        }
    });
}

const axios = require('axios');
const APIKey = process.env.YOUTUBE_API_KEY;
const domain = `https://www.googleapis.com/youtube/v3/`;
if (APIKey === undefined) {
    throw new Error('YOUTUBE_API_KEY not defined');
}
function getChannelInfoByUsername(username) {
    var url = `${domain}search?part=snippet&maxResults=1&q=${username}&type=channel&key=${APIKey}`;
    return axios.get(url).then(result => {
        var _a;
        console.log(result.data);
        try {
            const item = (_a = result.data) === null || _a === void 0 ? void 0 : _a.items[0];
            if (item != null) {
                return item.snippet;
            }
            else {
                return null;
            }
        }
        catch (e) {
            console.log('YouTubeAPI Response Parsing Error', e);
        }
        return null;
    }).catch(e => {
        console.log('YouTubeAPI Error', e);
    });
}
function getChannelInfoById(id) {
    var url = `${domain}channels?part=snippet%2CbrandingSettings&id=${id}&key=${APIKey}`;
    return axios.get(url).then(result => {
        var _a;
        console.log(result.data);
        try {
            const item = (_a = result.data) === null || _a === void 0 ? void 0 : _a.items[0];
            if (item != null) {
                return item.snippet;
            }
            else {
                return null;
            }
        }
        catch (e) {
            console.log('YouTubeAPI Response Parsing Error', e);
        }
        return null;
    }).catch(e => {
        console.log('YouTubeAPI Error', e);
    });
}

function getUserEmailFromEventIdentity(event) {
    var _a;
    event.identity;
    return (_a = event.identity.claims) === null || _a === void 0 ? void 0 : _a.email;
}
function getUserByEmail(email) {
    return scanItems({
        TableName: TABLES.User,
        ExpressionAttributeValues: {
            ':email': {
                S: email,
            },
        },
        FilterExpression: 'email = :email',
    }).then((data) => {
        if (data.length === 0) {
            throw new Error(`Unable to find user with email: ${email}`);
        }
        else {
            return data[0];
        }
    });
}

const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    try {
        const userEmail = getUserEmailFromEventIdentity(event);
        const currentUser = yield getUserByEmail(userEmail);
        const currentUserID = currentUser.id;
        let { title, description, avatarUrl, coverUrl, topicID, websiteUrl, sources, } = event.arguments.input;
        const publisherId = crypto.randomUUID();
        const sourceInputs = yield Promise.all(sources.map((source) => __awaiter(void 0, void 0, void 0, function* () {
            let title = null;
            switch (source.type) {
                case SourceType.RSS: {
                    const feed = yield parseRssFeed(source.rss.url);
                    title = feed.title;
                    break;
                }
                case SourceType.YOUTUBE: {
                    let channelInfo;
                    if (source.youtube.url) {
                        if (source.youtube.url.includes('channel')) {
                            source.youtube.channelID =
                                source.youtube.url.split('channel/')[1];
                            channelInfo = yield getChannelInfoById(source.youtube.channelID);
                        }
                        else {
                            source.youtube.username = source.youtube.url
                                .split('youtube.com/')[1]
                                .replace('@', '');
                            channelInfo = yield getChannelInfoByUsername(source.youtube.username);
                            source.youtube.channelID = channelInfo.channelId;
                        }
                    }
                    avatarUrl = channelInfo.thumbnails.default.url;
                    title = channelInfo.title;
                    break;
                }
                case SourceType.ITUNES: {
                    const feed = yield parseRssFeed(source.itunes.url);
                    title = feed.title;
                }
            }
            return {
                title: title,
                type: source.type,
                publisherID: publisherId,
                publisherTopicID: topicID,
                isHidden: false,
                rss: source.rss,
                twitter: source.twitter,
                youtube: source.youtube,
                itunes: source.itunes,
            };
        })));
        if (websiteUrl) {
            sourceInputs.push({
                type: SourceType.WEBSITE,
                publisherID: publisherId,
                publisherTopicID: topicID,
                creatorID: currentUserID,
                isHidden: false,
                website: {
                    url: websiteUrl,
                },
            });
        }
        const avatarFile = yield saveFileByUrl({
            url: avatarUrl,
            key: `public/publisher/${title}/avatar`,
        });
        const avatarPicture = yield createPicture({
            type: PictureType.AVATAR,
            bucket: avatarFile.bucket,
            key: avatarFile.key,
        });
        let coverPicture = null;
        if (coverUrl) {
            const coverFile = yield saveFileByUrl({
                url: coverUrl,
                key: `public/publisher/${title}/cover`,
            });
            coverPicture = yield createPicture({
                type: PictureType.COVER,
                bucket: coverFile.bucket,
                key: coverFile.key,
            });
        }
        const createdPublisher = yield createPublisher({
            id: publisherId,
            title,
            description,
            topicID: topicID,
            creatorID: currentUserID,
            avatarID: avatarPicture.id,
            coverID: coverPicture === null || coverPicture === void 0 ? void 0 : coverPicture.id,
        });
        yield createPublisherSources(sourceInputs);
        yield aggregateAllNewsItemsForPublisher(createdPublisher.id);
        return createdPublisher;
    }
    catch (e) {
        throw new Error(e.message);
    }
});

exports.handler = handler;
