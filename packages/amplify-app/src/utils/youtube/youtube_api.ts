const axios = require('axios');

const APIKey = process.env.YOUTUBE_API_KEY;
const domain = `https://www.googleapis.com/youtube/v3/`;

if (APIKey === undefined) {
    throw new Error('YOUTUBE_API_KEY not defined');
}

export function getVideosByPlaylistId(opt) {
    var options = {
        playlistId: opt && opt.playlistId ? opt.playlistId : null,
        count: opt && opt.count && opt.count <= 50 ? opt.count : opt && opt.count > 50 ? 50 : 20,
        token: opt && opt.token ? opt.token : ''
    };
    var url = `${domain}playlistItems?part=id%2C+snippet%2C+contentDetails%2C+status${options.token}&maxResults=${options.count}&playlistId=${options.playlistId}&key=${APIKey}`;
    return axios.get(url);
}

export function getChannelIdByUsername(username): Promise<string | null> {
    console.log(APIKey);
    const url = `${domain}channels?part=id&forUsername=${username}&key=${APIKey}`;
    return axios.get(url).then(result => {
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

export function getChannelInfoById(id) {
    var url = `${domain}channels?part=snippet%2CbrandingSettings&id=${id}&key=${APIKey}`;
    return axios.get(url);
}

export function getPlaylistsByChannelId(channelId) {
    var url = `${domain}playlists?part=id%2C+snippet%2C+contentDetails&channelId=${channelId}&maxResults=30&key=${APIKey}`;
    return axios.get(url);
}

export function getPlaylistIdByChannelId(channelId) {
    var url = `${domain}channels?part=id%2C+contentDetails&id=${channelId}&key=${APIKey}`;
    return axios.get(url);
}

export function getVideoInfo(videoId) {
    var url = `${domain}videos?part=snippet,statistics&id=${videoId}&key=${APIKey}`;
    return axios.get(url);
}

export function getVideoComments(opts) {
    var id = opts.id;
    var token = opts.token ? '&pageToken=' + opts.token : '';
    var url = `${domain}commentThreads?part=snippet&videoId=${id}&key=${APIKey}${token}`;
    return axios.get(url);
}

export function getVideosByChannelIdWithQuery(opts) {
    var promises = [];
    opts.channelIds.forEach((channelId) => {
        var url = `${domain}search?part=snippet&channelId=${channelId}&maxResults=50&order=date&q=${opts.query}&key=${APIKey}`;
        promises.push(
            new Promise((resolve, reject) => {
                axios.get(url).then((data) => {
                    resolve(data.data.items);
                }, (error) => {
                    reject(error);
                });
            })
        );
    });
    return Promise.all(promises);
}

export function getVideosByChannelId(opts) {
    var promises = [];
    opts.channelIds.forEach((channelId) => {
        var url = `${domain}search?part=snippet&channelId=${channelId}&maxResults=50&order=date&publishedAfter=${opts.date}&key=${APIKey}`;
        promises.push(
            new Promise((resolve, reject) => {
                axios.get(url).then((data) => {
                    resolve(data.data.items);
                }, (error) => {
                    reject(error);
                });
            })
        );
    });
    return Promise.all(promises);
}