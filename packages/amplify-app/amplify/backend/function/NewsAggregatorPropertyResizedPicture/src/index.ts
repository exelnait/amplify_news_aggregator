import type {AppSyncResolverHandler} from 'aws-lambda';

import {Picture, ResizedPicture} from "../../../../../src/API";

function getResizedPictureUrl(bucket: string, key: string, width?: number, height?: number): string {
    const params: Record<string, any> = {
        bucket,
        key
    }
    if (width && height) {
        params.edits = {
            resize: {
                width,
                height,
                fit: "cover"
            }
        }
    }
    const encodedParams = Buffer.from(JSON.stringify(params)).toString('base64');
    return `${process.env.CDN_URL}/${encodedParams}`;
}

export const handler: AppSyncResolverHandler<any, ResizedPicture , Picture> = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        __typename: 'ResizedPicture',
        custom: getResizedPictureUrl(event.source.bucket, event.source.key),
        original: getResizedPictureUrl(event.source.bucket, event.source.key),
        small: getResizedPictureUrl(event.source.bucket, event.source.key, 50, 50),
        medium: getResizedPictureUrl(event.source.bucket, event.source.key, 400, 250),
        large: getResizedPictureUrl(event.source.bucket, event.source.key, 800, 500),
    };
};

/**
 one option you could do is create the custom resolver rather than use the auto-gen'd.
 This link was helpful for me, https://dev.to/aws-builders/direct-lambda-resolvers-with-aws-amplify-and-appsync-2k3j.
 After completing this, you would have defined the AWS::AppSync::Resolver in CustomResources.json and add whatever Cache Config you want.
 */
