import { PublisherModel, SourceType } from '../data';

export class NewsItemModel {
  id!: string;
  title!: string;
  description?: string;
  type!: SourceType;
  coverUrl?: string;
  publisher!: PublisherModel;
  publishedAt!: Date;
  publishedAtFormatted: string = '';

  constructor(data: NewsItemModel) {
    Object.assign(this, data);
  }

  static fromGraphQL(data) {
    const baseFields = {
      id: data.id,
      title: data.title,
      type: data.type,
      description: data.description?.slice(0, 200) + '...',
      coverUrl: data.cover?.resized?.medium,
      publisher: PublisherModel.fromGraphQL(data.publisher),
      publishedAt: new Date(data.publishedAt),
      publishedAtFormatted:
        new Date(data.publishedAt).toLocaleDateString() +
        ' ' +
        new Date(data.publishedAt).toLocaleTimeString(),
    };
    switch (data.type) {
      case SourceType.Rss:
        return {
          ...baseFields,
          coverUrl: baseFields.coverUrl || data.rss?.coverUrl,
        };
      case SourceType.Youtube:
        return {
          ...baseFields,
          coverUrl: baseFields.coverUrl || data.youtube?.coverUrl,
        };
      case SourceType.Itunes:
        return {
          ...baseFields,
          coverUrl: baseFields.coverUrl || data.itunes?.coverUrl,
        };
    }
    return baseFields;
  }
}
