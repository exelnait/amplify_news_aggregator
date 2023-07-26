'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
var crypto = require('crypto');

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
const docClient = new clientDynamodb.DynamoDBClient({});
const TABLES = {
    User: process.env.API_NEWSAGGREGATOR_USERTABLE_NAME,
    Publisher: process.env.API_NEWSAGGREGATOR_PUBLISHERTABLE_NAME,
    Picture: process.env.API_NEWSAGGREGATOR_PICTURETABLE_NAME,
    PublisherSource: process.env.API_NEWSAGGREGATOR_PUBLISHERSOURCETABLE_NAME,
    NewsItem: process.env.API_NEWSAGGREGATOR_NEWSITEMTABLE_NAME,
};
console.log(TABLES);
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

function createUser(input) {
    return putItem(TABLES.User, input, 'User');
}

const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(JSON.stringify(event, null, 2));
    const { userName } = event;
    const { sub, email } = event.request.userAttributes;
    yield createUser({
        userName,
        email,
    });
    return event;
});

exports.handler = handler;
