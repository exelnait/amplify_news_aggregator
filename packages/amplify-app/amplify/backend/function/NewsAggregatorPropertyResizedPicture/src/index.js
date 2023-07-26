'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function getResizedPictureUrl(bucket, key, width, height) {
    const params = {
        bucket,
        key
    };
    if (width && height) {
        params.edits = {
            resize: {
                width,
                height,
                fit: "cover"
            }
        };
    }
    const encodedParams = Buffer.from(JSON.stringify(params)).toString('base64');
    return `${process.env.CDN_URL}/${encodedParams}`;
}
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        __typename: 'ResizedPicture',
        custom: getResizedPictureUrl(event.source.bucket, event.source.key),
        original: getResizedPictureUrl(event.source.bucket, event.source.key),
        small: getResizedPictureUrl(event.source.bucket, event.source.key, 50, 50),
        medium: getResizedPictureUrl(event.source.bucket, event.source.key, 400, 250),
        large: getResizedPictureUrl(event.source.bucket, event.source.key, 800, 500),
    };
});
/**
 one option you could do is create the custom resolver rather than use the auto-gen'd.
 This link was helpful for me, https://dev.to/aws-builders/direct-lambda-resolvers-with-aws-amplify-and-appsync-2k3j.
 After completing this, you would have defined the AWS::AppSync::Resolver in CustomResources.json and add whatever Cache Config you want.
 */

exports.handler = handler;
