const axios = require('axios');

const APIKey = process.env.YOUTUBE_API_KEY;
const domain = `https://www.googleapis.com/youtube/v3/`;

if (APIKey === undefined) {
    throw new Error('YOUTUBE_API_KEY not defined');
}
export function getChannelIdByUsername(username: string): Promise<string | null> {
    console.log(APIKey);
    const url = `${domain}channels?part=id&forUsername=${username}&key=${APIKey}`;
    return axios.get(url).then(result => {
        console.log(result.data)
        try {
            const item = result.data?.items[0];
            if (item != null) {
                return item.id;
            } else {
                return null;
            }
        } catch (e) {
            console.log('YouTubeAPI Response Parsing Error', e);
        }
        return null
    }).catch(e => {
        console.log('YouTubeAPI Error', e);
    });
}

export function getChannelInfoByUsername(username: string) {
    var url = `${domain}search?part=snippet&maxResults=1&q=${username}&type=channel&key=${APIKey}`;
    return axios.get(url).then(result => {
        console.log(result.data)
        try {
            const item = result.data?.items[0];
            if (item != null) {
                return item.snippet;
            } else {
                return null;
            }
        } catch (e) {
            console.log('YouTubeAPI Response Parsing Error', e);
        }
        return null
    }).catch(e => {
        console.log('YouTubeAPI Error', e);
    });
}
export function getChannelInfoById(id: string) {
    var url = `${domain}channels?part=snippet%2CbrandingSettings&id=${id}&key=${APIKey}`;
    return axios.get(url).then(result => {
        console.log(result.data)
        try {
            const item = result.data?.items[0];
            if (item != null) {
                return item.snippet;
            } else {
                return null;
            }
        } catch (e) {
            console.log('YouTubeAPI Response Parsing Error', e);
        }
        return null
    }).catch(e => {
        console.log('YouTubeAPI Error', e);
    });
}