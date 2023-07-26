/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePublisherCustomInput = {
  title?: string | null,
  description?: string | null,
  avatarUrl?: string | null,
  coverUrl?: string | null,
  topicID: string,
  websiteUrl?: string | null,
  sources?: Array< CreatePublisherSourceCustomInput > | null,
};

export type CreatePublisherSourceCustomInput = {
  type: SourceType,
  rss?: CreatePublisherSourceRSSInput | null,
  youtube?: CreatePublisherSourceYoutubeInput | null,
  twitter?: CreatePublisherSourceTwitterInput | null,
  itunes?: CreatePublisherSourceRSSInput | null,
};

export enum SourceType {
  CUSTOM = "CUSTOM",
  RSS = "RSS",
  YOUTUBE = "YOUTUBE",
  TWITTER = "TWITTER",
  ITUNES = "ITUNES",
  WEBSITE = "WEBSITE",
}


export type CreatePublisherSourceRSSInput = {
  url: string,
};

export type CreatePublisherSourceYoutubeInput = {
  username?: string | null,
  channelID?: string | null,
};

export type CreatePublisherSourceTwitterInput = {
  username: string,
};

export type Publisher = {
  __typename: "Publisher",
  id: string,
  title: string,
  description: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  topicID: string,
  topic: Topic,
  sources?: ModelPublisherSourceConnection | null,
  avatarID: string,
  avatar: Picture,
  coverID?: string | null,
  cover?: Picture | null,
  news?: ModelNewsItemConnection | null,
};

export type Topic = {
  __typename: "Topic",
  id: string,
  title: string,
  description: string,
  type: TopicType,
  createdAt?: string | null,
  updatedAt?: string | null,
  publishers?: ModelPublisherConnection | null,
  news?: ModelNewsItemConnection | null,
};

export enum TopicType {
  GAMING = "GAMING",
  TECH = "TECH",
  DEV = "DEV",
  CUSTOM = "CUSTOM",
}


export type ModelPublisherConnection = {
  __typename: "ModelPublisherConnection",
  items:  Array<Publisher | null >,
  nextToken?: string | null,
};

export type ModelNewsItemConnection = {
  __typename: "ModelNewsItemConnection",
  items:  Array<NewsItem | null >,
  nextToken?: string | null,
};

export type NewsItem = {
  __typename: "NewsItem",
  id: string,
  type: SourceType,
  title: string,
  description: string,
  publishedAt: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  coverID?: string | null,
  cover?: Picture | null,
  publisherID: string,
  publisher: Publisher,
  topicID: string,
  topic: Topic,
  rss?: NewsItemDataRSS | null,
  youtube?: NewsItemDataYouTube | null,
  itunes?: NewsItemDataITunes | null,
  viewsCount: number,
};

export type Picture = {
  __typename: "Picture",
  id: string,
  type: PictureType,
  bucket: string,
  key: string,
  resized?: ResizedPicture | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export enum PictureType {
  AVATAR = "AVATAR",
  COVER = "COVER",
}


export type ResizedPicture = {
  __typename: "ResizedPicture",
  original: string,
  custom: string,
  small: string,
  medium: string,
  large: string,
};

export type NewsItemDataRSS = {
  __typename: "NewsItemDataRSS",
  url: string,
  ampUrl?: string | null,
  categories?: Array< string > | null,
  author?: string | null,
  isScraped: boolean,
  coverUrl?: string | null,
  contentHtml?: string | null,
  contentText?: string | null,
  contentJson?: string | null,
  wordsCount?: number | null,
  readingDurationInMilliseconds?: number | null,
  keywords?: Array< string > | null,
  summary?: string | null,
};

export type NewsItemDataYouTube = {
  __typename: "NewsItemDataYouTube",
  videoId: string,
  coverUrl?: string | null,
};

export type NewsItemDataITunes = {
  __typename: "NewsItemDataITunes",
  audioUrl: string,
  coverUrl?: string | null,
  keywords?: Array< string > | null,
  durationFormatted?: string | null,
};

export type ModelPublisherSourceConnection = {
  __typename: "ModelPublisherSourceConnection",
  items:  Array<PublisherSource | null >,
  nextToken?: string | null,
};

export type PublisherSource = {
  __typename: "PublisherSource",
  id: string,
  type: string,
  title?: string | null,
  isHidden: boolean,
  publisherTopicID: string,
  publisherID: string,
  website?: PublisherSourceWebsite | null,
  rss?: PublisherSourceRSS | null,
  youtube?: PublisherSourceYouTube | null,
  twitter?: PublisherSourceTwitter | null,
  itunes?: PublisherSourceITunes | null,
  createdAt: string,
  updatedAt: string,
};

export type PublisherSourceWebsite = {
  __typename: "PublisherSourceWebsite",
  url: string,
};

export type PublisherSourceRSS = {
  __typename: "PublisherSourceRSS",
  url: string,
};

export type PublisherSourceYouTube = {
  __typename: "PublisherSourceYouTube",
  playlistUrl?: string | null,
  channelID: string,
  username?: string | null,
};

export type PublisherSourceTwitter = {
  __typename: "PublisherSourceTwitter",
  username: string,
};

export type PublisherSourceITunes = {
  __typename: "PublisherSourceITunes",
  url: string,
};

export type CreateTopicInput = {
  id?: string | null,
  title: string,
  description: string,
  type: TopicType,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelTopicConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  type?: ModelTopicTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTopicConditionInput | null > | null,
  or?: Array< ModelTopicConditionInput | null > | null,
  not?: ModelTopicConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelTopicTypeInput = {
  eq?: TopicType | null,
  ne?: TopicType | null,
};

export type UpdateTopicInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  type?: TopicType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteTopicInput = {
  id: string,
};

export type CreatePictureInput = {
  id?: string | null,
  type: PictureType,
  bucket: string,
  key: string,
  resized?: ResizedPictureInput | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ResizedPictureInput = {
  original: string,
  custom: string,
  small: string,
  medium: string,
  large: string,
};

export type ModelPictureConditionInput = {
  type?: ModelPictureTypeInput | null,
  bucket?: ModelStringInput | null,
  key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPictureConditionInput | null > | null,
  or?: Array< ModelPictureConditionInput | null > | null,
  not?: ModelPictureConditionInput | null,
};

export type ModelPictureTypeInput = {
  eq?: PictureType | null,
  ne?: PictureType | null,
};

export type UpdatePictureInput = {
  id: string,
  type?: PictureType | null,
  bucket?: string | null,
  key?: string | null,
  resized?: ResizedPictureInput | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeletePictureInput = {
  id: string,
};

export type CreateNewsItemInput = {
  id?: string | null,
  type: SourceType,
  title: string,
  description: string,
  publishedAt: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  coverID?: string | null,
  publisherID: string,
  topicID: string,
  rss?: NewsItemDataRSSInput | null,
  youtube?: NewsItemDataYouTubeInput | null,
  itunes?: NewsItemDataITunesInput | null,
  viewsCount: number,
};

export type NewsItemDataRSSInput = {
  url: string,
  ampUrl?: string | null,
  categories?: Array< string > | null,
  author?: string | null,
  isScraped: boolean,
  coverUrl?: string | null,
  contentHtml?: string | null,
  contentText?: string | null,
  contentJson?: string | null,
  wordsCount?: number | null,
  readingDurationInMilliseconds?: number | null,
  keywords?: Array< string > | null,
  summary?: string | null,
};

export type NewsItemDataYouTubeInput = {
  videoId: string,
  coverUrl?: string | null,
};

export type NewsItemDataITunesInput = {
  audioUrl: string,
  coverUrl?: string | null,
  keywords?: Array< string > | null,
  durationFormatted?: string | null,
};

export type ModelNewsItemConditionInput = {
  type?: ModelSourceTypeInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  coverID?: ModelIDInput | null,
  publisherID?: ModelIDInput | null,
  topicID?: ModelIDInput | null,
  viewsCount?: ModelIntInput | null,
  and?: Array< ModelNewsItemConditionInput | null > | null,
  or?: Array< ModelNewsItemConditionInput | null > | null,
  not?: ModelNewsItemConditionInput | null,
};

export type ModelSourceTypeInput = {
  eq?: SourceType | null,
  ne?: SourceType | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateNewsItemInput = {
  id: string,
  type?: SourceType | null,
  title?: string | null,
  description?: string | null,
  publishedAt: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  coverID?: string | null,
  publisherID?: string | null,
  topicID?: string | null,
  rss?: NewsItemDataRSSInput | null,
  youtube?: NewsItemDataYouTubeInput | null,
  itunes?: NewsItemDataITunesInput | null,
  viewsCount?: number | null,
};

export type DeleteNewsItemInput = {
  id: string,
  publishedAt: string,
};

export type CreatePublisherSourceInput = {
  id?: string | null,
  type: string,
  title?: string | null,
  isHidden: boolean,
  publisherTopicID: string,
  publisherID: string,
  website?: PublisherSourceWebsiteInput | null,
  rss?: PublisherSourceRSSInput | null,
  youtube?: PublisherSourceYouTubeInput | null,
  twitter?: PublisherSourceTwitterInput | null,
  itunes?: PublisherSourceITunesInput | null,
};

export type PublisherSourceWebsiteInput = {
  url: string,
};

export type PublisherSourceRSSInput = {
  url: string,
};

export type PublisherSourceYouTubeInput = {
  playlistUrl?: string | null,
  channelID: string,
  username?: string | null,
};

export type PublisherSourceTwitterInput = {
  username: string,
};

export type PublisherSourceITunesInput = {
  url: string,
};

export type ModelPublisherSourceConditionInput = {
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  isHidden?: ModelBooleanInput | null,
  publisherTopicID?: ModelIDInput | null,
  publisherID?: ModelIDInput | null,
  and?: Array< ModelPublisherSourceConditionInput | null > | null,
  or?: Array< ModelPublisherSourceConditionInput | null > | null,
  not?: ModelPublisherSourceConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePublisherSourceInput = {
  id: string,
  type?: string | null,
  title?: string | null,
  isHidden?: boolean | null,
  publisherTopicID?: string | null,
  publisherID?: string | null,
  website?: PublisherSourceWebsiteInput | null,
  rss?: PublisherSourceRSSInput | null,
  youtube?: PublisherSourceYouTubeInput | null,
  twitter?: PublisherSourceTwitterInput | null,
  itunes?: PublisherSourceITunesInput | null,
};

export type DeletePublisherSourceInput = {
  id: string,
};

export type CreatePublisherInput = {
  id?: string | null,
  title: string,
  description: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  topicID: string,
  avatarID: string,
  coverID?: string | null,
};

export type ModelPublisherConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  topicID?: ModelIDInput | null,
  avatarID?: ModelIDInput | null,
  coverID?: ModelIDInput | null,
  and?: Array< ModelPublisherConditionInput | null > | null,
  or?: Array< ModelPublisherConditionInput | null > | null,
  not?: ModelPublisherConditionInput | null,
};

export type UpdatePublisherInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  topicID?: string | null,
  avatarID?: string | null,
  coverID?: string | null,
};

export type DeletePublisherInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  userName: string,
  email: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelUserConditionInput = {
  userName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  userName: string,
  email: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  userName?: string | null,
  email?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type GetNewsItemRSSInput = {
  id: string,
};

export type SearchableNewsItemFilterInput = {
  id?: SearchableStringFilterInput | null,
  title?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  publishedAt?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  coverID?: SearchableIDFilterInput | null,
  publisherID?: SearchableIDFilterInput | null,
  topicID?: SearchableIDFilterInput | null,
  viewsCount?: SearchableIntFilterInput | null,
  type?: SearchableStringFilterInput | null,
  and?: Array< SearchableNewsItemFilterInput | null > | null,
  or?: Array< SearchableNewsItemFilterInput | null > | null,
  not?: SearchableNewsItemFilterInput | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableNewsItemSortInput = {
  field?: SearchableNewsItemSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableNewsItemSortableFields {
  id = "id",
  title = "title",
  description = "description",
  publishedAt = "publishedAt",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  coverID = "coverID",
  publisherID = "publisherID",
  topicID = "topicID",
  viewsCount = "viewsCount",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableNewsItemAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableNewsItemAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableNewsItemAggregateField {
  id = "id",
  type = "type",
  title = "title",
  description = "description",
  publishedAt = "publishedAt",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  coverID = "coverID",
  publisherID = "publisherID",
  topicID = "topicID",
  viewsCount = "viewsCount",
}


export type SearchableNewsItemConnection = {
  __typename: "SearchableNewsItemConnection",
  items:  Array<NewsItem | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelTopicFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  type?: ModelTopicTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTopicFilterInput | null > | null,
  or?: Array< ModelTopicFilterInput | null > | null,
  not?: ModelTopicFilterInput | null,
};

export type ModelTopicConnection = {
  __typename: "ModelTopicConnection",
  items:  Array<Topic | null >,
  nextToken?: string | null,
};

export type ModelPictureFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelPictureTypeInput | null,
  bucket?: ModelStringInput | null,
  key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPictureFilterInput | null > | null,
  or?: Array< ModelPictureFilterInput | null > | null,
  not?: ModelPictureFilterInput | null,
};

export type ModelPictureConnection = {
  __typename: "ModelPictureConnection",
  items:  Array<Picture | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelNewsItemFilterInput = {
  id?: ModelStringInput | null,
  type?: ModelSourceTypeInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  publishedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  coverID?: ModelIDInput | null,
  publisherID?: ModelIDInput | null,
  topicID?: ModelIDInput | null,
  viewsCount?: ModelIntInput | null,
  and?: Array< ModelNewsItemFilterInput | null > | null,
  or?: Array< ModelNewsItemFilterInput | null > | null,
  not?: ModelNewsItemFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPublisherSourceFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  isHidden?: ModelBooleanInput | null,
  publisherTopicID?: ModelIDInput | null,
  publisherID?: ModelIDInput | null,
  and?: Array< ModelPublisherSourceFilterInput | null > | null,
  or?: Array< ModelPublisherSourceFilterInput | null > | null,
  not?: ModelPublisherSourceFilterInput | null,
};

export type ModelPublisherFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  topicID?: ModelIDInput | null,
  avatarID?: ModelIDInput | null,
  coverID?: ModelIDInput | null,
  and?: Array< ModelPublisherFilterInput | null > | null,
  or?: Array< ModelPublisherFilterInput | null > | null,
  not?: ModelPublisherFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  userName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTopicFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTopicFilterInput | null > | null,
  or?: Array< ModelSubscriptionTopicFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPictureFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  bucket?: ModelSubscriptionStringInput | null,
  key?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPictureFilterInput | null > | null,
  or?: Array< ModelSubscriptionPictureFilterInput | null > | null,
};

export type ModelSubscriptionNewsItemFilterInput = {
  id?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  publishedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  coverID?: ModelSubscriptionIDInput | null,
  publisherID?: ModelSubscriptionIDInput | null,
  topicID?: ModelSubscriptionIDInput | null,
  viewsCount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionNewsItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionNewsItemFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPublisherSourceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  isHidden?: ModelSubscriptionBooleanInput | null,
  publisherTopicID?: ModelSubscriptionIDInput | null,
  publisherID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionPublisherSourceFilterInput | null > | null,
  or?: Array< ModelSubscriptionPublisherSourceFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionPublisherFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  topicID?: ModelSubscriptionIDInput | null,
  avatarID?: ModelSubscriptionIDInput | null,
  coverID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionPublisherFilterInput | null > | null,
  or?: Array< ModelSubscriptionPublisherFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type CreatePublisherCustomMutationVariables = {
  input: CreatePublisherCustomInput,
};

export type CreatePublisherCustomMutation = {
  createPublisherCustom:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  },
};

export type CreateTopicMutationVariables = {
  input: CreateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type CreateTopicMutation = {
  createTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateTopicMutationVariables = {
  input: UpdateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type UpdateTopicMutation = {
  updateTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteTopicMutationVariables = {
  input: DeleteTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type DeleteTopicMutation = {
  deleteTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreatePictureMutationVariables = {
  input: CreatePictureInput,
  condition?: ModelPictureConditionInput | null,
};

export type CreatePictureMutation = {
  createPicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdatePictureMutationVariables = {
  input: UpdatePictureInput,
  condition?: ModelPictureConditionInput | null,
};

export type UpdatePictureMutation = {
  updatePicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeletePictureMutationVariables = {
  input: DeletePictureInput,
  condition?: ModelPictureConditionInput | null,
};

export type DeletePictureMutation = {
  deletePicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateNewsItemMutationVariables = {
  input: CreateNewsItemInput,
  condition?: ModelNewsItemConditionInput | null,
};

export type CreateNewsItemMutation = {
  createNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type UpdateNewsItemMutationVariables = {
  input: UpdateNewsItemInput,
  condition?: ModelNewsItemConditionInput | null,
};

export type UpdateNewsItemMutation = {
  updateNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type DeleteNewsItemMutationVariables = {
  input: DeleteNewsItemInput,
  condition?: ModelNewsItemConditionInput | null,
};

export type DeleteNewsItemMutation = {
  deleteNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type CreatePublisherSourceMutationVariables = {
  input: CreatePublisherSourceInput,
  condition?: ModelPublisherSourceConditionInput | null,
};

export type CreatePublisherSourceMutation = {
  createPublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePublisherSourceMutationVariables = {
  input: UpdatePublisherSourceInput,
  condition?: ModelPublisherSourceConditionInput | null,
};

export type UpdatePublisherSourceMutation = {
  updatePublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePublisherSourceMutationVariables = {
  input: DeletePublisherSourceInput,
  condition?: ModelPublisherSourceConditionInput | null,
};

export type DeletePublisherSourceMutation = {
  deletePublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePublisherMutationVariables = {
  input: CreatePublisherInput,
  condition?: ModelPublisherConditionInput | null,
};

export type CreatePublisherMutation = {
  createPublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePublisherMutationVariables = {
  input: UpdatePublisherInput,
  condition?: ModelPublisherConditionInput | null,
};

export type UpdatePublisherMutation = {
  updatePublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePublisherMutationVariables = {
  input: DeletePublisherInput,
  condition?: ModelPublisherConditionInput | null,
};

export type DeletePublisherMutation = {
  deletePublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetNewsItemRSSQueryVariables = {
  input: GetNewsItemRSSInput,
};

export type GetNewsItemRSSQuery = {
  getNewsItemRSS?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type SearchNewsItemsQueryVariables = {
  filter?: SearchableNewsItemFilterInput | null,
  sort?: Array< SearchableNewsItemSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableNewsItemAggregationInput | null > | null,
};

export type SearchNewsItemsQuery = {
  searchNewsItems?:  {
    __typename: "SearchableNewsItemConnection",
    items:  Array< {
      __typename: "NewsItem",
      id: string,
      type: SourceType,
      title: string,
      description: string,
      publishedAt: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      publisherID: string,
      publisher:  {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      },
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      rss?:  {
        __typename: "NewsItemDataRSS",
        url: string,
        ampUrl?: string | null,
        categories?: Array< string > | null,
        author?: string | null,
        isScraped: boolean,
        coverUrl?: string | null,
        contentHtml?: string | null,
        contentText?: string | null,
        contentJson?: string | null,
        wordsCount?: number | null,
        readingDurationInMilliseconds?: number | null,
        keywords?: Array< string > | null,
        summary?: string | null,
      } | null,
      youtube?:  {
        __typename: "NewsItemDataYouTube",
        videoId: string,
        coverUrl?: string | null,
      } | null,
      itunes?:  {
        __typename: "NewsItemDataITunes",
        audioUrl: string,
        coverUrl?: string | null,
        keywords?: Array< string > | null,
        durationFormatted?: string | null,
      } | null,
      viewsCount: number,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetTopicQueryVariables = {
  id: string,
};

export type GetTopicQuery = {
  getTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListTopicsQueryVariables = {
  filter?: ModelTopicFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicsQuery = {
  listTopics?:  {
    __typename: "ModelTopicConnection",
    items:  Array< {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPictureQueryVariables = {
  id: string,
};

export type GetPictureQuery = {
  getPicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListPicturesQueryVariables = {
  filter?: ModelPictureFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPicturesQuery = {
  listPictures?:  {
    __typename: "ModelPictureConnection",
    items:  Array< {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNewsItemQueryVariables = {
  id: string,
  publishedAt: string,
};

export type GetNewsItemQuery = {
  getNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type ListNewsItemsQueryVariables = {
  id?: string | null,
  publishedAt?: ModelStringKeyConditionInput | null,
  filter?: ModelNewsItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListNewsItemsQuery = {
  listNewsItems?:  {
    __typename: "ModelNewsItemConnection",
    items:  Array< {
      __typename: "NewsItem",
      id: string,
      type: SourceType,
      title: string,
      description: string,
      publishedAt: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      publisherID: string,
      publisher:  {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      },
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      rss?:  {
        __typename: "NewsItemDataRSS",
        url: string,
        ampUrl?: string | null,
        categories?: Array< string > | null,
        author?: string | null,
        isScraped: boolean,
        coverUrl?: string | null,
        contentHtml?: string | null,
        contentText?: string | null,
        contentJson?: string | null,
        wordsCount?: number | null,
        readingDurationInMilliseconds?: number | null,
        keywords?: Array< string > | null,
        summary?: string | null,
      } | null,
      youtube?:  {
        __typename: "NewsItemDataYouTube",
        videoId: string,
        coverUrl?: string | null,
      } | null,
      itunes?:  {
        __typename: "NewsItemDataITunes",
        audioUrl: string,
        coverUrl?: string | null,
        keywords?: Array< string > | null,
        durationFormatted?: string | null,
      } | null,
      viewsCount: number,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPublisherSourceQueryVariables = {
  id: string,
};

export type GetPublisherSourceQuery = {
  getPublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPublisherSourcesQueryVariables = {
  filter?: ModelPublisherSourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPublisherSourcesQuery = {
  listPublisherSources?:  {
    __typename: "ModelPublisherSourceConnection",
    items:  Array< {
      __typename: "PublisherSource",
      id: string,
      type: string,
      title?: string | null,
      isHidden: boolean,
      publisherTopicID: string,
      publisherID: string,
      website?:  {
        __typename: "PublisherSourceWebsite",
        url: string,
      } | null,
      rss?:  {
        __typename: "PublisherSourceRSS",
        url: string,
      } | null,
      youtube?:  {
        __typename: "PublisherSourceYouTube",
        playlistUrl?: string | null,
        channelID: string,
        username?: string | null,
      } | null,
      twitter?:  {
        __typename: "PublisherSourceTwitter",
        username: string,
      } | null,
      itunes?:  {
        __typename: "PublisherSourceITunes",
        url: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPublisherQueryVariables = {
  id: string,
};

export type GetPublisherQuery = {
  getPublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListPublishersQueryVariables = {
  filter?: ModelPublisherFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPublishersQuery = {
  listPublishers?:  {
    __typename: "ModelPublisherConnection",
    items:  Array< {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userName: string,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NewsItemsByPublisherIDAndPublishedAtQueryVariables = {
  publisherID: string,
  publishedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNewsItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NewsItemsByPublisherIDAndPublishedAtQuery = {
  newsItemsByPublisherIDAndPublishedAt?:  {
    __typename: "ModelNewsItemConnection",
    items:  Array< {
      __typename: "NewsItem",
      id: string,
      type: SourceType,
      title: string,
      description: string,
      publishedAt: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      publisherID: string,
      publisher:  {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      },
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      rss?:  {
        __typename: "NewsItemDataRSS",
        url: string,
        ampUrl?: string | null,
        categories?: Array< string > | null,
        author?: string | null,
        isScraped: boolean,
        coverUrl?: string | null,
        contentHtml?: string | null,
        contentText?: string | null,
        contentJson?: string | null,
        wordsCount?: number | null,
        readingDurationInMilliseconds?: number | null,
        keywords?: Array< string > | null,
        summary?: string | null,
      } | null,
      youtube?:  {
        __typename: "NewsItemDataYouTube",
        videoId: string,
        coverUrl?: string | null,
      } | null,
      itunes?:  {
        __typename: "NewsItemDataITunes",
        audioUrl: string,
        coverUrl?: string | null,
        keywords?: Array< string > | null,
        durationFormatted?: string | null,
      } | null,
      viewsCount: number,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NewsItemsByTopicIDAndPublishedAtQueryVariables = {
  topicID: string,
  publishedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNewsItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NewsItemsByTopicIDAndPublishedAtQuery = {
  newsItemsByTopicIDAndPublishedAt?:  {
    __typename: "ModelNewsItemConnection",
    items:  Array< {
      __typename: "NewsItem",
      id: string,
      type: SourceType,
      title: string,
      description: string,
      publishedAt: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      publisherID: string,
      publisher:  {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      },
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      rss?:  {
        __typename: "NewsItemDataRSS",
        url: string,
        ampUrl?: string | null,
        categories?: Array< string > | null,
        author?: string | null,
        isScraped: boolean,
        coverUrl?: string | null,
        contentHtml?: string | null,
        contentText?: string | null,
        contentJson?: string | null,
        wordsCount?: number | null,
        readingDurationInMilliseconds?: number | null,
        keywords?: Array< string > | null,
        summary?: string | null,
      } | null,
      youtube?:  {
        __typename: "NewsItemDataYouTube",
        videoId: string,
        coverUrl?: string | null,
      } | null,
      itunes?:  {
        __typename: "NewsItemDataITunes",
        audioUrl: string,
        coverUrl?: string | null,
        keywords?: Array< string > | null,
        durationFormatted?: string | null,
      } | null,
      viewsCount: number,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PublisherSourcesByTypeQueryVariables = {
  type: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPublisherSourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PublisherSourcesByTypeQuery = {
  publisherSourcesByType?:  {
    __typename: "ModelPublisherSourceConnection",
    items:  Array< {
      __typename: "PublisherSource",
      id: string,
      type: string,
      title?: string | null,
      isHidden: boolean,
      publisherTopicID: string,
      publisherID: string,
      website?:  {
        __typename: "PublisherSourceWebsite",
        url: string,
      } | null,
      rss?:  {
        __typename: "PublisherSourceRSS",
        url: string,
      } | null,
      youtube?:  {
        __typename: "PublisherSourceYouTube",
        playlistUrl?: string | null,
        channelID: string,
        username?: string | null,
      } | null,
      twitter?:  {
        __typename: "PublisherSourceTwitter",
        username: string,
      } | null,
      itunes?:  {
        __typename: "PublisherSourceITunes",
        url: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PublisherSourcesByPublisherTopicIDQueryVariables = {
  publisherTopicID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPublisherSourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PublisherSourcesByPublisherTopicIDQuery = {
  publisherSourcesByPublisherTopicID?:  {
    __typename: "ModelPublisherSourceConnection",
    items:  Array< {
      __typename: "PublisherSource",
      id: string,
      type: string,
      title?: string | null,
      isHidden: boolean,
      publisherTopicID: string,
      publisherID: string,
      website?:  {
        __typename: "PublisherSourceWebsite",
        url: string,
      } | null,
      rss?:  {
        __typename: "PublisherSourceRSS",
        url: string,
      } | null,
      youtube?:  {
        __typename: "PublisherSourceYouTube",
        playlistUrl?: string | null,
        channelID: string,
        username?: string | null,
      } | null,
      twitter?:  {
        __typename: "PublisherSourceTwitter",
        username: string,
      } | null,
      itunes?:  {
        __typename: "PublisherSourceITunes",
        url: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PublisherSourcesByPublisherIDAndTypeQueryVariables = {
  publisherID: string,
  type?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPublisherSourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PublisherSourcesByPublisherIDAndTypeQuery = {
  publisherSourcesByPublisherIDAndType?:  {
    __typename: "ModelPublisherSourceConnection",
    items:  Array< {
      __typename: "PublisherSource",
      id: string,
      type: string,
      title?: string | null,
      isHidden: boolean,
      publisherTopicID: string,
      publisherID: string,
      website?:  {
        __typename: "PublisherSourceWebsite",
        url: string,
      } | null,
      rss?:  {
        __typename: "PublisherSourceRSS",
        url: string,
      } | null,
      youtube?:  {
        __typename: "PublisherSourceYouTube",
        playlistUrl?: string | null,
        channelID: string,
        username?: string | null,
      } | null,
      twitter?:  {
        __typename: "PublisherSourceTwitter",
        username: string,
      } | null,
      itunes?:  {
        __typename: "PublisherSourceITunes",
        url: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PublishersByTopicIDQueryVariables = {
  topicID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPublisherFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PublishersByTopicIDQuery = {
  publishersByTopicID?:  {
    __typename: "ModelPublisherConnection",
    items:  Array< {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserByUserNameQueryVariables = {
  userName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByUserNameQuery = {
  getUserByUserName?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userName: string,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTopicSubscriptionVariables = {
  filter?: ModelSubscriptionTopicFilterInput | null,
};

export type OnCreateTopicSubscription = {
  onCreateTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateTopicSubscriptionVariables = {
  filter?: ModelSubscriptionTopicFilterInput | null,
};

export type OnUpdateTopicSubscription = {
  onUpdateTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteTopicSubscriptionVariables = {
  filter?: ModelSubscriptionTopicFilterInput | null,
};

export type OnDeleteTopicSubscription = {
  onDeleteTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    description: string,
    type: TopicType,
    createdAt?: string | null,
    updatedAt?: string | null,
    publishers?:  {
      __typename: "ModelPublisherConnection",
      items:  Array< {
        __typename: "Publisher",
        id: string,
        title: string,
        description: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        topicID: string,
        avatarID: string,
        coverID?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreatePictureSubscriptionVariables = {
  filter?: ModelSubscriptionPictureFilterInput | null,
};

export type OnCreatePictureSubscription = {
  onCreatePicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdatePictureSubscriptionVariables = {
  filter?: ModelSubscriptionPictureFilterInput | null,
};

export type OnUpdatePictureSubscription = {
  onUpdatePicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeletePictureSubscriptionVariables = {
  filter?: ModelSubscriptionPictureFilterInput | null,
};

export type OnDeletePictureSubscription = {
  onDeletePicture?:  {
    __typename: "Picture",
    id: string,
    type: PictureType,
    bucket: string,
    key: string,
    resized?:  {
      __typename: "ResizedPicture",
      original: string,
      custom: string,
      small: string,
      medium: string,
      large: string,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateNewsItemSubscriptionVariables = {
  filter?: ModelSubscriptionNewsItemFilterInput | null,
};

export type OnCreateNewsItemSubscription = {
  onCreateNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type OnUpdateNewsItemSubscriptionVariables = {
  filter?: ModelSubscriptionNewsItemFilterInput | null,
};

export type OnUpdateNewsItemSubscription = {
  onUpdateNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type OnDeleteNewsItemSubscriptionVariables = {
  filter?: ModelSubscriptionNewsItemFilterInput | null,
};

export type OnDeleteNewsItemSubscription = {
  onDeleteNewsItem?:  {
    __typename: "NewsItem",
    id: string,
    type: SourceType,
    title: string,
    description: string,
    publishedAt: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    publisherID: string,
    publisher:  {
      __typename: "Publisher",
      id: string,
      title: string,
      description: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      topicID: string,
      topic:  {
        __typename: "Topic",
        id: string,
        title: string,
        description: string,
        type: TopicType,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      sources?:  {
        __typename: "ModelPublisherSourceConnection",
        nextToken?: string | null,
      } | null,
      avatarID: string,
      avatar:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      coverID?: string | null,
      cover?:  {
        __typename: "Picture",
        id: string,
        type: PictureType,
        bucket: string,
        key: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    rss?:  {
      __typename: "NewsItemDataRSS",
      url: string,
      ampUrl?: string | null,
      categories?: Array< string > | null,
      author?: string | null,
      isScraped: boolean,
      coverUrl?: string | null,
      contentHtml?: string | null,
      contentText?: string | null,
      contentJson?: string | null,
      wordsCount?: number | null,
      readingDurationInMilliseconds?: number | null,
      keywords?: Array< string > | null,
      summary?: string | null,
    } | null,
    youtube?:  {
      __typename: "NewsItemDataYouTube",
      videoId: string,
      coverUrl?: string | null,
    } | null,
    itunes?:  {
      __typename: "NewsItemDataITunes",
      audioUrl: string,
      coverUrl?: string | null,
      keywords?: Array< string > | null,
      durationFormatted?: string | null,
    } | null,
    viewsCount: number,
  } | null,
};

export type OnCreatePublisherSourceSubscriptionVariables = {
  filter?: ModelSubscriptionPublisherSourceFilterInput | null,
};

export type OnCreatePublisherSourceSubscription = {
  onCreatePublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePublisherSourceSubscriptionVariables = {
  filter?: ModelSubscriptionPublisherSourceFilterInput | null,
};

export type OnUpdatePublisherSourceSubscription = {
  onUpdatePublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePublisherSourceSubscriptionVariables = {
  filter?: ModelSubscriptionPublisherSourceFilterInput | null,
};

export type OnDeletePublisherSourceSubscription = {
  onDeletePublisherSource?:  {
    __typename: "PublisherSource",
    id: string,
    type: string,
    title?: string | null,
    isHidden: boolean,
    publisherTopicID: string,
    publisherID: string,
    website?:  {
      __typename: "PublisherSourceWebsite",
      url: string,
    } | null,
    rss?:  {
      __typename: "PublisherSourceRSS",
      url: string,
    } | null,
    youtube?:  {
      __typename: "PublisherSourceYouTube",
      playlistUrl?: string | null,
      channelID: string,
      username?: string | null,
    } | null,
    twitter?:  {
      __typename: "PublisherSourceTwitter",
      username: string,
    } | null,
    itunes?:  {
      __typename: "PublisherSourceITunes",
      url: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePublisherSubscriptionVariables = {
  filter?: ModelSubscriptionPublisherFilterInput | null,
};

export type OnCreatePublisherSubscription = {
  onCreatePublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePublisherSubscriptionVariables = {
  filter?: ModelSubscriptionPublisherFilterInput | null,
};

export type OnUpdatePublisherSubscription = {
  onUpdatePublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePublisherSubscriptionVariables = {
  filter?: ModelSubscriptionPublisherFilterInput | null,
};

export type OnDeletePublisherSubscription = {
  onDeletePublisher?:  {
    __typename: "Publisher",
    id: string,
    title: string,
    description: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    topicID: string,
    topic:  {
      __typename: "Topic",
      id: string,
      title: string,
      description: string,
      type: TopicType,
      createdAt?: string | null,
      updatedAt?: string | null,
      publishers?:  {
        __typename: "ModelPublisherConnection",
        nextToken?: string | null,
      } | null,
      news?:  {
        __typename: "ModelNewsItemConnection",
        nextToken?: string | null,
      } | null,
    },
    sources?:  {
      __typename: "ModelPublisherSourceConnection",
      items:  Array< {
        __typename: "PublisherSource",
        id: string,
        type: string,
        title?: string | null,
        isHidden: boolean,
        publisherTopicID: string,
        publisherID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    avatarID: string,
    avatar:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    },
    coverID?: string | null,
    cover?:  {
      __typename: "Picture",
      id: string,
      type: PictureType,
      bucket: string,
      key: string,
      resized?:  {
        __typename: "ResizedPicture",
        original: string,
        custom: string,
        small: string,
        medium: string,
        large: string,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    news?:  {
      __typename: "ModelNewsItemConnection",
      items:  Array< {
        __typename: "NewsItem",
        id: string,
        type: SourceType,
        title: string,
        description: string,
        publishedAt: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        coverID?: string | null,
        publisherID: string,
        topicID: string,
        viewsCount: number,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
