import { parseString } from 'xml2js';
import axios, {AxiosResponse} from "axios";

export function parseITunesXMLFeed(feedUrl) {
    return axios({
        method: 'get',
        url: feedUrl
    }).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return new Promise((resolve, reject) => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result['rss']['channel'][0]);
                    }
                });
            });
        }
    });
}