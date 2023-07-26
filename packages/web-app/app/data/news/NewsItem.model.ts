export class NewsItemModel {
  id!: string;
  title!: string;

  constructor(data: NewsItemModel) {
    Object.assign(this, data);
  }

  static fromGraphQL(data: any) {
    return new NewsItemModel({
      id: data.id,
      title: data.title,
    });
  }
}
