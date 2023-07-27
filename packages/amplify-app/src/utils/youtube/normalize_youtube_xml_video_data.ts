import { convertHtmlToText } from '../rss/convert_html_to_text';

import linkifyHtml from 'linkify-html';

export interface INormalizedYouTubeVideo {
  title: string;
  cover: string;
  video_id: string;
  author: string;
  channel_id: string;
  description: string;
  description_html: string;
  published_date: string;
}

export function normalizeYouTubeXMLFeedData(
  videosArray
): INormalizedYouTubeVideo[] {
  return videosArray.map((video) => {
    const description_html = normalizeYouTubeXMLDescription(
      video['media:group'][0]['media:description'][0]
    );
    return {
      title: video['title'][0],
      cover: video['media:group'][0]['media:thumbnail'][0]['$'].url,
      video_id: video['yt:videoId'][0],
      author: video['author'][0].name[0],
      channel_id: video['yt:channelId'][0],
      description: convertHtmlToText(description_html),
      description_html,
      published_date: video['published'][0],
    };
  });
}

function normalizeYouTubeXMLDescription(description) {
  let result = '';
  description.split('\n').forEach((string) => {
    if (
      string.search('vk') < 0 ||
      string.search('twitter') < 0 ||
      string.search('facebook') < 0 ||
      string.search('youtube') < 0 ||
      string.search('goo.gl') < 0 ||
      string.search('plus.google') < 0
    ) {
      result += string + '<br/>';
    }
  });
  return linkifyHtml(result);
}
