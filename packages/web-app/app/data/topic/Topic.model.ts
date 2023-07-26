import { PublisherModel } from '../data';

export class TopicModel {
  id!: string;
  title!: string;
  publishers: PublisherModel[] = [];

  constructor(data: TopicModel) {
    Object.assign(this, data);
  }

  static fromGraphQL(data) {
    return new TopicModel({
      id: data.id,
      title: data.title,
      publishers: data.publishers
        ? data.publishers.items.map((publisher) =>
            PublisherModel.fromGraphQL(publisher)
          )
        : [],
    });
  }
}
