import { SourceType } from '../../graphql/schema';

export class PublisherSource {
  id!: string;
  type!: SourceType;

  rss?: PublisherSourceRSS;
  youtube?: PublisherSourceYouTube;

  constructor(data: PublisherSource) {
    Object.assign(this, data);
  }
}

interface PublisherSourceRSS {
  url: string;
}

interface PublisherSourceYouTube {
  username: string;
  channelID: string;
}
