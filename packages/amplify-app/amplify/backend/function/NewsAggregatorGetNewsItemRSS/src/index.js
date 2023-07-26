'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
var crypto = require('crypto');
var clientLambda = require('@aws-sdk/client-lambda');
var perf_hooks = require('perf_hooks');
var Parser = require('@postlight/parser');
var cheerio = require('cheerio');
var util = require('util');
var imageSize = require('request-image-size');
var HtmlToArticleJsonConverter = require('html-to-article-json');
var htmlToText = require('html-to-text');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Parser__default = /*#__PURE__*/_interopDefaultLegacy(Parser);
var cheerio__default = /*#__PURE__*/_interopDefaultLegacy(cheerio);
var imageSize__default = /*#__PURE__*/_interopDefaultLegacy(imageSize);
var HtmlToArticleJsonConverter__default = /*#__PURE__*/_interopDefaultLegacy(HtmlToArticleJsonConverter);

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
function getItem(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield docClient.send(new clientDynamodb.QueryCommand(params));
        if (data.Items[0]) {
            return utilDynamodb.unmarshall(data.Items[0], unmarshallOptions);
        }
        return null;
    });
}
function getItemById(tableName, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: TABLES.NewsItem,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: { ":id": { "S": id } }
        };
        return getItem(params);
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

function getNewsItemById(id) {
    return getItemById(TABLES.NewsItem, id);
}
function updateNewsItem(newsItem) {
    return putItem(TABLES.NewsItem, newsItem, "NewsItem");
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

const SCRAP_ARTICLE_LAMBDA_NAME = process.env.FUNCTION_NEWSAGGREGATORARTICLESCRAP_NAME;
function scrapArticle(url) {
    const startTime = perf_hooks.performance.now();
    return invokeLambda(SCRAP_ARTICLE_LAMBDA_NAME, {
        arguments: {
            url
        }
    }).then((response) => {
        console.log(`Scrap article lambda time: ${perf_hooks.performance.now() - startTime}ms`);
        return response;
    });
}

function parseArticle(url) {
    const startTime = perf_hooks.performance.now();
    return Parser__default["default"].parse(url).then((response) => {
        console.log(`Parse article lambda time: ${perf_hooks.performance.now() - startTime}ms`);
        return response;
    });
}
// TODO add custom parsers for specific websites

function calculateReadingTimeInMillisecondsByWordsCount(wordsCount) {
    const wpm = 225;
    const time = Math.ceil(wordsCount / wpm);
    return time * 60000;
}
function getDomain(link) {
    const domain = link ? link.split('/')[2] : link;
    let source = domain ? domain.replace('www.', '').toLowerCase() : null;
    if (source && source === 'feedproxy.google.com' || source === 'soundcloud.com') {
        source = link.split('/')[4];
    }
    if (source && source.includes('-') && !source.includes('.')) {
        source = source.replace('-', '.');
    }
    if (source && source.includes('?')) {
        source = source.split('?')[0];
    }
    return source;
}

/**
 This regex represents a loose rule of an “image candidate string”.
 @see https://html.spec.whatwg.org/multipage/images.html#srcset-attribute
 An “image candidate string” roughly consists of the following:
 1. Zero or more whitespace characters.
 2. A non-empty URL that does not start or end with `,`.
 3. Zero or more whitespace characters.
 4. An optional “descriptor” that starts with a whitespace character.
 5. Zero or more whitespace characters.
 6. Each image candidate string is separated by a `,`.
 We intentionally implement a loose rule here so that we can perform more aggressive error handling and reporting in the below code.
 */
const imageCandidateRegex = /\s*([^,]\S*[^,](?:\s+[^,]+)?)\s*(?:,|$)/;
const duplicateDescriptorCheck = (allDescriptors, value, postfix) => {
    allDescriptors[postfix] = allDescriptors[postfix] || {};
    if (allDescriptors[postfix][value]) {
        throw new Error(`No more than one image candidate is allowed for a given descriptor: ${value}${postfix}`);
    }
    allDescriptors[postfix][value] = true;
};
const fallbackDescriptorDuplicateCheck = allDescriptors => {
    if (allDescriptors.fallback) {
        throw new Error('Only one fallback image candidate is allowed');
    }
    if (allDescriptors.x['1']) {
        throw new Error('A fallback image is equivalent to a 1x descriptor, providing both is invalid.');
    }
    allDescriptors.fallback = true;
};
const descriptorCountCheck = (allDescriptors, currentDescriptors) => {
    if (currentDescriptors.length === 0) {
        fallbackDescriptorDuplicateCheck(allDescriptors);
    }
    else if (currentDescriptors.length > 1) {
        throw new Error(`Image candidate may have no more than one descriptor, found ${currentDescriptors.length}: ${currentDescriptors.join(' ')}`);
    }
};
const validDescriptorCheck = (value, postfix, descriptor) => {
    if (Number.isNaN(value)) {
        throw new TypeError(`${descriptor || value} is not a valid number`);
    }
    switch (postfix) {
        case 'w': {
            if (value <= 0) {
                throw new Error('Width descriptor must be greater than zero');
            }
            else if (!Number.isInteger(value)) {
                throw new TypeError('Width descriptor must be an integer');
            }
            break;
        }
        case 'x': {
            if (value <= 0) {
                throw new Error('Pixel density descriptor must be greater than zero');
            }
            break;
        }
        case 'h': {
            throw new Error('Height descriptor is no longer allowed');
        }
        default: {
            throw new Error(`Invalid srcset descriptor: ${descriptor}`);
        }
    }
};
/**
 Parse the HTML `<img>` [srcset](http://mobile.smashingmagazine.com/2013/08/21/webkit-implements-srcset-and-why-its-a-good-thing/) attribute.
 Accepts a “srcset” string and returns an array of objects with the possible properties: `url` (always), `width`, `density`, and `height`.
 @example
 ```
 import {parseSrcset} from 'srcset';
 console.log(parseSrcset('banner-HD.jpg 2x, banner-phone.jpg 100w'));
 // [
 //    {
// 		url: 'banner-HD.jpg',
// 		density: 2
// 	},
 //    {
// 		url: 'banner-phone.jpg',
// 		width: 100
// 	}
 // ]
 ```
 * @param string
 * @param options
 */
function parseSrcset(string, options) {
    const { strict = false } = options || {};
    const allDescriptors = strict ? {} : undefined;
    return string.split(imageCandidateRegex)
        .filter((part, index) => index % 2 === 1)
        .map(part => {
        const [url, ...descriptors] = part.trim().split(/\s+/);
        const result = { url };
        if (strict) {
            descriptorCountCheck(allDescriptors, descriptors);
        }
        for (const descriptor of descriptors) {
            const postfix = descriptor[descriptor.length - 1];
            const value = Number.parseFloat(descriptor.slice(0, -1));
            if (strict) {
                validDescriptorCheck(value, postfix, descriptor);
                duplicateDescriptorCheck(allDescriptors, value, postfix);
            }
            switch (postfix) {
                case 'w': {
                    result.width = value;
                    break;
                }
                case 'h': {
                    result.height = value;
                    break;
                }
                case 'x': {
                    result.density = value;
                    break;
                }
                // No default
            }
        }
        return result;
    });
}

function normalizeHtml({ html, domain, coverUrl }) {
    const $ = cheerio__default["default"].load(html);
    (function images() {
        $('img').each(function (i) {
            var _a, _b;
            let src = $(this).attr('src');
            if (i == 0 && getStringSimilarity(src, coverUrl) > 50) {
                $(this).remove();
            }
            else {
                const srcSetAttr = $(this).attr('srcset');
                const image = normalizeImagesSet(src, $(this).attr('srcset'));
                if (!image.src || image.src === coverUrl) {
                    $(this).remove();
                }
                else {
                    $(this).removeAttr('alt');
                    $(this).removeAttr('title');
                    if (image.type === 'set') {
                        const parsedSrcSet = parseSrcset(srcSetAttr);
                        const averageSrcSet = getAverageImageFromSrcSet(parsedSrcSet);
                        if (i == 0 && getStringSimilarity(averageSrcSet.url, coverUrl) > 50) {
                            $(this).remove();
                        }
                        else {
                            $(this).attr('src', averageSrcSet.url);
                            $(this).attr('width', averageSrcSet.width.toString());
                            $(this).attr('height', (_b = (_a = averageSrcSet.height) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : (averageSrcSet.width * 10 / 16).toString());
                        }
                    }
                    else {
                        $(this).attr('src', normalizeImageUrl(src, domain));
                    }
                }
            }
        });
    })();
    (function iframe() {
        $('iframe').each(function () {
            const src = $(this).attr('src');
            if (src && !src.includes('https')) {
                $(this).attr('src', src.replace('http', 'https'));
            }
        });
    })();
    (function link() {
        $('a').each(function () {
            let href = $(this).attr('href');
            if (href) {
                href = deleteSpan(href);
                $(this).removeAttr('title');
                $(this).attr('href', href);
                $(this).attr('target', '_blank');
            }
        });
    })();
    (function p() {
        $('p').removeAttr('style');
    })();
    (function scripts() {
        $('script').remove();
    })();
    return $.html({ decodeEntities: false });
}
function normalizeImagesSet(src, src_set) {
    let result = {
        type: 'null',
        src: null
    };
    if (src && src.includes('%20')) {
        result = {
            type: 'set',
            src: src.replace(/%20/ig, ' ')
        };
    }
    else if (src_set) {
        result = {
            type: 'set',
            src: src_set
        };
    }
    else if (src) {
        result = {
            type: 'image',
            src
        };
    }
    return result;
}
function deleteSpan(string) {
    const regex = /<\/?span[^>]*>/g;
    if (string.match(regex)) {
        return string.replace(regex, "").replace(/\s+/g, "");
    }
    return string;
}
function normalizeImageUrl(src, domain) {
    if (src.startsWith('/') && !src.startsWith('//') && domain) {
        return 'http://' + domain + src;
    }
    if (src.startsWith('//')) {
        return src.replace('//', 'http://');
    }
    if (src.startsWith('https://')) {
        return src.replace('https://', 'http://');
    }
    return src;
}
function getAverageImageFromSrcSet(srcSet) {
    let sum = 0;
    for (const image of srcSet) {
        sum += image.width;
    }
    const avg = sum / srcSet.length;
    let closestDiff = Number.MAX_VALUE;
    let closestSrcSet;
    for (const image of srcSet) {
        const diff = Math.abs(image.width - avg);
        if (diff < closestDiff) {
            closestDiff = diff;
            closestSrcSet = image;
        }
    }
    return closestSrcSet;
}
function getStringSimilarity(string1, string2) {
    const maxLength = string1.length + string2.length;
    let numMatchingChars = 0;
    for (let i = 0; i < maxLength; i++) {
        if (string1[i] === string2[i]) {
            numMatchingChars++;
        }
        else {
            break;
        }
    }
    for (let i = 0; i < maxLength; i++) {
        if (string1[string1.length - 1 - i] === string2[string2.length - 1 - i]) {
            numMatchingChars++;
        }
        else {
            break;
        }
    }
    let maxSubstringLength = 0;
    for (let i = 0; i < string1.length; i++) {
        for (let j = 0; j < string2.length; j++) {
            let substringLength = 0;
            while (string1[i + substringLength] === string2[j + substringLength] && (i + substringLength) < string1.length && (j + substringLength) < string2.length) {
                substringLength++;
            }
            maxSubstringLength = Math.max(maxSubstringLength, substringLength);
        }
    }
    numMatchingChars += maxSubstringLength;
    return (numMatchingChars / maxLength) * 100;
}

const sizeOf = util.promisify(imageSize__default["default"]);
const htmlToArticleJson = HtmlToArticleJsonConverter__default["default"]();
var ArticleJsonChildType;
(function (ArticleJsonChildType) {
    ArticleJsonChildType["paragraph"] = "paragraph";
    ArticleJsonChildType["text"] = "text";
    ArticleJsonChildType["linebreak"] = "linebreak";
    ArticleJsonChildType["embed"] = "embed";
    ArticleJsonChildType["blockquote"] = "blockquote";
    ArticleJsonChildType["header1"] = "header1";
    ArticleJsonChildType["header2"] = "header2";
    ArticleJsonChildType["header3"] = "header3";
    ArticleJsonChildType["header4"] = "header4";
    ArticleJsonChildType["header5"] = "header5";
    ArticleJsonChildType["header6"] = "header6";
})(ArticleJsonChildType || (ArticleJsonChildType = {}));
var ArticleJsonEmbedType;
(function (ArticleJsonEmbedType) {
    ArticleJsonEmbedType["custom"] = "custom";
    ArticleJsonEmbedType["image"] = "image";
    ArticleJsonEmbedType["facebook"] = "facebook";
    ArticleJsonEmbedType["instagram"] = "instagram";
    ArticleJsonEmbedType["twitter"] = "twitter";
    ArticleJsonEmbedType["youtube"] = "youtube";
    ArticleJsonEmbedType["video"] = "video";
})(ArticleJsonEmbedType || (ArticleJsonEmbedType = {}));
function convertHtmlToJson(html, options = {
    requestImageDimensions: false
}) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentJson = htmlToArticleJson(html);
        for (let item_index = 0; item_index < contentJson.length; item_index++) {
            const item = contentJson[item_index];
            const { type, embedType, width, height, src } = item;
            if (type === ArticleJsonChildType.paragraph) {
                item.children = item.children.map((children, children_index) => {
                    if (children.type === ArticleJsonChildType.embed) {
                        contentJson.splice(Number(item_index), 0, children);
                        return null;
                    }
                    return children;
                }).filter(Boolean);
            }
            if (type === ArticleJsonChildType.embed) {
                if (embedType === ArticleJsonEmbedType.image) {
                    if ((!width || !height) && src) {
                        if (options.requestImageDimensions) {
                            try {
                                const dimensions = yield getImageDimensions(item_index, src);
                                item.width = dimensions.width;
                                item.height = dimensions.height;
                            }
                            catch (e) {
                                console.log(`Invalid image: ${src}`);
                                contentJson[item_index] = null;
                            }
                        }
                        else {
                            item.width = 400;
                            item.height = 250;
                        }
                    }
                }
            }
        }
        return contentJson.filter(Boolean);
    });
}
function getImageDimensions(index, src) {
    return sizeOf({ uri: src, timeout: 5000 });
}

function convertHtmlToText(html) {
    return htmlToText.convert(html, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
        singleNewLineParagraphs: true
    }).replace(/\[.+?\]/g, '');
}

function normalizeNewsItemFromRSS(item, options = {
    needToNormalizeContent: false
}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const startTime = perf_hooks.performance.now();
            const [scrapedArticle, parsedArticle] = yield Promise.all([
                scrapArticle(item.rss.url),
                parseArticle(item.rss.url)
            ]);
            const parsingTime = perf_hooks.performance.now();
            console.log(`Parsing time: ${parsingTime - startTime}ms`);
            // console.log('scrapedArticle', JSON.stringify(scrapedArticle, null, 2));
            // console.log('parsedArticle', JSON.stringify(parsedArticle, null, 2));
            const coverUrl = parsedArticle.lead_image_url || scrapedArticle.top_image;
            if (!item.coverID && coverUrl) {
                item.rss.coverUrl = coverUrl;
                item.coverID = crypto.randomUUID(); // S3 cover creation should be later
            }
            const normalizeContentTime = perf_hooks.performance.now();
            const domain = getDomain(item.rss.url);
            const normalizedHtml = normalizeHtml({ html: parsedArticle.content, domain, coverUrl: item.rss.coverUrl });
            const htmlJson = yield convertHtmlToJson(normalizedHtml, {
                requestImageDimensions: true
            });
            item.rss.contentHtml = normalizedHtml;
            item.rss.contentJson = JSON.stringify(htmlJson);
            item.rss.contentText = scrapedArticle.text || parsedArticle.content ? convertHtmlToText(normalizedHtml) : null;
            item.rss.isScraped = true;
            console.log(`Normalize content time: ${normalizeContentTime - parsingTime}ms`);
            item.rss.wordsCount = item.rss.contentText + "" ? parsedArticle.word_count : 0;
            item.rss.readingDurationInMilliseconds = parsedArticle.word_count ? calculateReadingTimeInMillisecondsByWordsCount(parsedArticle.word_count) : 0;
            //NLP
            item.rss.keywords = scrapedArticle.keywords;
            item.rss.summary = scrapedArticle.summary;
            console.log(`Normalize news item time: ${perf_hooks.performance.now() - startTime}ms`);
            return item;
        }
        catch (e) {
            console.log('normalizeNewsItemFromRSS Error', e.message);
            return null;
        }
    });
}

const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const newsItem = yield getNewsItemById(event.arguments.input.id);
        if (newsItem) {
            const updatedNewsItem = yield normalizeNewsItemFromRSS(newsItem, {
                needToNormalizeContent: true,
            });
            yield updateNewsItem(updatedNewsItem);
            return updatedNewsItem;
        }
        else {
            throw new Error('NewsItem not found');
        }
    }
    catch (e) {
        throw new Error(e);
    }
});

exports.handler = handler;
