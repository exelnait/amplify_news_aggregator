import { createHash } from 'crypto';

import type { INormalizedYouTubeVideo } from '../utils/youtube/normalize_youtube_xml_video_data';

import { CreateNewsItemInput, PublisherSource, SourceType } from '../API';

interface INewsItemYouTubeData {
  title: string;
  description: string;
  publisherId: string;
  creatorId: string;
  topicId: string;
  publishedDate: string;
  videoId: string;
  coverUrl: string;
}

export class NewsItemYouTube {
  data: INewsItemYouTubeData;

  constructor(data: INewsItemYouTubeData) {
    this.data = data;
  }

  static fromNormalizedYouTubeXMLItem(
    item: INormalizedYouTubeVideo,
    source: PublisherSource
  ): NewsItemYouTube {
    return new NewsItemYouTube({
      title: item.title,
      description: item.description,
      publisherId: source.publisherID,
      creatorId: source.creatorID,
      topicId: source.publisherTopicID,
      publishedDate: item.published_date,
      videoId: item.video_id,
      coverUrl: item.cover,
    });
  }

  toInput(): CreateNewsItemInput {
    const {
      title,
      description,
      publisherId,
      creatorId,
      topicId,
      publishedDate,
      videoId,
      coverUrl,
    } = this.data;
    return {
      id: createHash('md5').update(videoId).digest('hex'),
      title,
      description,
      type: SourceType.YOUTUBE,
      publisherID: publisherId,
      topicID: topicId,
      publishedAt: publishedDate,
      youtube: {
        videoId,
        coverUrl,
      },
      creatorID: creatorId,
    };
  }
}
