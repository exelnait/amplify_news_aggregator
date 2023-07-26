import { parseString } from 'xml2js';
import axios, {AxiosResponse} from "axios";

interface IParsedYoutubeFeedXML {
    title: string[];
    entry: any[]
}

export function parseYouTubeXMLFeed(youtubeChannelId: string): Promise<IParsedYoutubeFeedXML> {
    const url = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + youtubeChannelId;
    return axios({
        method: 'get',
        url
    }).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return new Promise((resolve, reject) => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result['feed'] as IParsedYoutubeFeedXML);
                    }
                });
            });
        }
    });
}