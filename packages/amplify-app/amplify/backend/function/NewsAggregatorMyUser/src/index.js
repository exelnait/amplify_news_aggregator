'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clientDynamodb = require('@aws-sdk/client-dynamodb');
var utilDynamodb = require('@aws-sdk/util-dynamodb');
require('crypto');

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
    const userEmail = getUserEmailFromEventIdentity(event);
    return yield getUserByEmail(userEmail);
});

exports.handler = handler;
