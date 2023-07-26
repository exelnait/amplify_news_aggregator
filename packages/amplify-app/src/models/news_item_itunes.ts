import { createHash } from 'crypto';

import { CreateNewsItemInput, PublisherSource, SourceType } from '../API';
import { INormalizedITunesPodcast } from '../utils/itunes/normalize_itunes_xml_data';

interface INewsItemITunesData {
  title: string;
  description: string;
  publisherId: string;
  creatorId: string;
  topicId: string;
  publishedDate: string;
  coverUrl: string;

  audioUrl: string;
  durationFormatted: string;
}

export class NewsItemITunes {
  data: INewsItemITunesData;

  constructor(data: INewsItemITunesData) {
    this.data = data;
  }

  static fromNormalizedITunesXMLItem(
    item: INormalizedITunesPodcast,
    source: PublisherSource
  ): NewsItemITunes {
    return new NewsItemITunes({
      title: item.title,
      description: item.description,
      publisherId: source.publisherID,
      creatorId: source.creatorID,
      topicId: source.publisherTopicID,
      publishedDate: item.published_date,
      audioUrl: item.audio_url,
      coverUrl: item.image,
      durationFormatted: item.duration,
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
      audioUrl,
      coverUrl,
      durationFormatted,
    } = this.data;
    return {
      id: createHash('md5').update(audioUrl).digest('hex'),
      title,
      description,
      type: SourceType.ITUNES,
      publisherID: publisherId,
      topicID: topicId,
      publishedAt: publishedDate,
      itunes: {
        audioUrl,
        coverUrl,
        durationFormatted,
      },
      creatorID: creatorId,
    };
  }
}
