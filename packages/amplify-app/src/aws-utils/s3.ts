import {S3} from "@aws-sdk/client-s3";
import {downloadFileFromURL} from "../utils/file.utils";

const BUCKET = process.env.STORAGE_NEWSAGGREGATORSTORAGE_BUCKETNAME;

const s3 = new S3({});

export async function saveFileByUrl({url, key}: { url: string, key: string }): Promise<{bucket: string, key: string}> {
    if (!BUCKET) {
        throw new Error('BUCKET is not defined');
    }
    const buffer = await downloadFileFromURL(url);
    if (buffer) {
        await s3.putObject({Bucket: BUCKET, Key: key, Body: buffer});
        return {
            bucket: BUCKET,
            key,
        }
    } else {
        throw new Error('File is empty');
    }
}