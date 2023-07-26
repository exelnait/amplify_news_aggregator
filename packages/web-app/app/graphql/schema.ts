import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid
   * ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations)
   * string. In other words, this scalar type accepts datetime strings of the form
   * `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the
   * form `-YYYY` which correspond to years before `0000`. For example,
   * "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime
   * strings.  The field after the two digit seconds field is a nanoseconds field. It
   * can accept between 1 and 9 digits. So, for example,
   * "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and
   * "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The
   * seconds and nanoseconds fields are optional (the seconds field must be specified
   * if the nanoseconds field is to be used).  The [time zone
   * offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is
   * compulsory for this scalar. The time zone offset must either be `Z`
   * (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds
   * field in the timezone offset will be considered valid even though it is not part
   * of the ISO 8601 standard.
   */
  AWSDateTime: { input: Date; output: Date; }
  /**
   * The `AWSJSON` scalar type provided by AWS AppSync, represents a JSON string that
   * complies with [RFC 8259](https://tools.ietf.org/html/rfc8259).  Maps like
   * "**{\\"upvotes\\": 10}**", lists like "**[1,2,3]**", and scalar values like
   * "**\\"AWSJSON example string\\"**", "**1**", and "**true**" are accepted as
   * valid JSON and will automatically be parsed and loaded in the resolver mapping
   * templates as Maps, Lists, or Scalar values rather than as the literal input
   * strings.  Invalid JSON strings like "**{a: 1}**", "**{'a': 1}**" and "**Unquoted
   * string**" will throw GraphQL validation errors.
   */
  AWSJSON: { input: string; output: string; }
  AWSTimestamp: { input: string; output: string; }
};

export type CreateNewsItemInput = {
  coverID?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  creatorID: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  itunes?: InputMaybe<NewsItemDataITunesInput>;
  publishedAt: Scalars['AWSDateTime']['input'];
  publisherID: Scalars['ID']['input'];
  rss?: InputMaybe<NewsItemDataRssInput>;
  title: Scalars['String']['input'];
  topicID: Scalars['ID']['input'];
  type: SourceType;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  youtube?: InputMaybe<NewsItemDataYouTubeInput>;
};

export type CreatePictureInput = {
  bucket: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  key: Scalars['String']['input'];
  resized?: InputMaybe<ResizedPictureInput>;
  type: PictureType;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type CreatePublisherCustomInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  sources?: InputMaybe<Array<CreatePublisherSourceCustomInput>>;
  title: Scalars['String']['input'];
  topicID: Scalars['ID']['input'];
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePublisherInput = {
  avatarID: Scalars['ID']['input'];
  coverID?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  creatorID: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  topicID: Scalars['ID']['input'];
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type CreatePublisherSourceCustomInput = {
  itunes?: InputMaybe<CreatePublisherSourceRssInput>;
  rss?: InputMaybe<CreatePublisherSourceRssInput>;
  twitter?: InputMaybe<CreatePublisherSourceTwitterInput>;
  type: SourceType;
  youtube?: InputMaybe<CreatePublisherSourceYoutubeInput>;
};

export type CreatePublisherSourceInput = {
  creatorID: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  isHidden: Scalars['Boolean']['input'];
  itunes?: InputMaybe<PublisherSourceITunesInput>;
  publisherID: Scalars['ID']['input'];
  publisherTopicID: Scalars['ID']['input'];
  rss?: InputMaybe<PublisherSourceRssInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<PublisherSourceTwitterInput>;
  type: Scalars['String']['input'];
  website?: InputMaybe<PublisherSourceWebsiteInput>;
  youtube?: InputMaybe<PublisherSourceYouTubeInput>;
};

export type CreatePublisherSourceRssInput = {
  url: Scalars['String']['input'];
};

export type CreatePublisherSourceTwitterInput = {
  username: Scalars['String']['input'];
};

export type CreatePublisherSourceYoutubeInput = {
  channelID?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTopicInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  creatorID: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type CreateUserInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  userName: Scalars['String']['input'];
};

export type DeleteNewsItemInput = {
  id: Scalars['String']['input'];
  publishedAt: Scalars['AWSDateTime']['input'];
};

export type DeletePictureInput = {
  id: Scalars['ID']['input'];
};

export type DeletePublisherInput = {
  id: Scalars['ID']['input'];
};

export type DeletePublisherSourceInput = {
  id: Scalars['ID']['input'];
};

export type DeleteTopicInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export type GetNewsItemRssInput = {
  id: Scalars['String']['input'];
};

export enum Language {
  En = 'EN',
  Ru = 'RU'
}

export enum ModelAttributeTypes {
  Null = '_null',
  Binary = 'binary',
  BinarySet = 'binarySet',
  Bool = 'bool',
  List = 'list',
  Map = 'map',
  Number = 'number',
  NumberSet = 'numberSet',
  String = 'string',
  StringSet = 'stringSet'
}

export type ModelBooleanInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ModelFloatInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  ge?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  le?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
};

export type ModelIdInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['ID']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  ge?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  le?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<ModelSizeInput>;
};

export type ModelIntInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
};

export type ModelNewsItemConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelNewsItemConditionInput>>>;
  coverID?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  creatorID?: InputMaybe<ModelIdInput>;
  description?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelNewsItemConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelNewsItemConditionInput>>>;
  publisherID?: InputMaybe<ModelIdInput>;
  title?: InputMaybe<ModelStringInput>;
  topicID?: InputMaybe<ModelIdInput>;
  type?: InputMaybe<ModelSourceTypeInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelNewsItemConnection = {
  __typename?: 'ModelNewsItemConnection';
  items: Array<Maybe<NewsItem>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelNewsItemFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelNewsItemFilterInput>>>;
  coverID?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  creatorID?: InputMaybe<ModelIdInput>;
  description?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelNewsItemFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelNewsItemFilterInput>>>;
  publishedAt?: InputMaybe<ModelStringInput>;
  publisherID?: InputMaybe<ModelIdInput>;
  title?: InputMaybe<ModelStringInput>;
  topicID?: InputMaybe<ModelIdInput>;
  type?: InputMaybe<ModelSourceTypeInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelPictureConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPictureConditionInput>>>;
  bucket?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  key?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelPictureConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPictureConditionInput>>>;
  type?: InputMaybe<ModelPictureTypeInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelPictureConnection = {
  __typename?: 'ModelPictureConnection';
  items: Array<Maybe<Picture>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelPictureFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPictureFilterInput>>>;
  bucket?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  key?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelPictureFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPictureFilterInput>>>;
  type?: InputMaybe<ModelPictureTypeInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelPictureTypeInput = {
  eq?: InputMaybe<PictureType>;
  ne?: InputMaybe<PictureType>;
};

export type ModelPublisherConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPublisherConditionInput>>>;
  avatarID?: InputMaybe<ModelIdInput>;
  coverID?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  creatorID?: InputMaybe<ModelIdInput>;
  description?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelPublisherConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPublisherConditionInput>>>;
  title?: InputMaybe<ModelStringInput>;
  topicID?: InputMaybe<ModelIdInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelPublisherConnection = {
  __typename?: 'ModelPublisherConnection';
  items: Array<Maybe<Publisher>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelPublisherFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPublisherFilterInput>>>;
  avatarID?: InputMaybe<ModelIdInput>;
  coverID?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  creatorID?: InputMaybe<ModelIdInput>;
  description?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelPublisherFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPublisherFilterInput>>>;
  title?: InputMaybe<ModelStringInput>;
  topicID?: InputMaybe<ModelIdInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelPublisherSourceConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPublisherSourceConditionInput>>>;
  creatorID?: InputMaybe<ModelIdInput>;
  isHidden?: InputMaybe<ModelBooleanInput>;
  not?: InputMaybe<ModelPublisherSourceConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPublisherSourceConditionInput>>>;
  publisherID?: InputMaybe<ModelIdInput>;
  publisherTopicID?: InputMaybe<ModelIdInput>;
  title?: InputMaybe<ModelStringInput>;
  type?: InputMaybe<ModelStringInput>;
};

export type ModelPublisherSourceConnection = {
  __typename?: 'ModelPublisherSourceConnection';
  items: Array<Maybe<PublisherSource>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelPublisherSourceFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPublisherSourceFilterInput>>>;
  creatorID?: InputMaybe<ModelIdInput>;
  id?: InputMaybe<ModelIdInput>;
  isHidden?: InputMaybe<ModelBooleanInput>;
  not?: InputMaybe<ModelPublisherSourceFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPublisherSourceFilterInput>>>;
  publisherID?: InputMaybe<ModelIdInput>;
  publisherTopicID?: InputMaybe<ModelIdInput>;
  title?: InputMaybe<ModelStringInput>;
  type?: InputMaybe<ModelStringInput>;
};

export type ModelSizeInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
};

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ModelSourceTypeInput = {
  eq?: InputMaybe<SourceType>;
  ne?: InputMaybe<SourceType>;
};

export type ModelStringInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<ModelSizeInput>;
};

export type ModelStringKeyConditionInput = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
};

export type ModelSubscriptionBooleanInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ModelSubscriptionFloatInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  ge?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  le?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type ModelSubscriptionIdInput = {
  beginsWith?: InputMaybe<Scalars['ID']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  ge?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  le?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ModelSubscriptionIntInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type ModelSubscriptionNewsItemFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionNewsItemFilterInput>>>;
  coverID?: InputMaybe<ModelSubscriptionIdInput>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  creatorID?: InputMaybe<ModelSubscriptionIdInput>;
  description?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionStringInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionNewsItemFilterInput>>>;
  publishedAt?: InputMaybe<ModelSubscriptionStringInput>;
  publisherID?: InputMaybe<ModelSubscriptionIdInput>;
  title?: InputMaybe<ModelSubscriptionStringInput>;
  topicID?: InputMaybe<ModelSubscriptionIdInput>;
  type?: InputMaybe<ModelSubscriptionStringInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionPictureFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionPictureFilterInput>>>;
  bucket?: InputMaybe<ModelSubscriptionStringInput>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  key?: InputMaybe<ModelSubscriptionStringInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionPictureFilterInput>>>;
  type?: InputMaybe<ModelSubscriptionStringInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionPublisherFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionPublisherFilterInput>>>;
  avatarID?: InputMaybe<ModelSubscriptionIdInput>;
  coverID?: InputMaybe<ModelSubscriptionIdInput>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  creatorID?: InputMaybe<ModelSubscriptionIdInput>;
  description?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionPublisherFilterInput>>>;
  title?: InputMaybe<ModelSubscriptionStringInput>;
  topicID?: InputMaybe<ModelSubscriptionIdInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionPublisherSourceFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionPublisherSourceFilterInput>>>;
  creatorID?: InputMaybe<ModelSubscriptionIdInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  isHidden?: InputMaybe<ModelSubscriptionBooleanInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionPublisherSourceFilterInput>>>;
  publisherID?: InputMaybe<ModelSubscriptionIdInput>;
  publisherTopicID?: InputMaybe<ModelSubscriptionIdInput>;
  title?: InputMaybe<ModelSubscriptionStringInput>;
  type?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ModelSubscriptionTopicFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionTopicFilterInput>>>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  creatorID?: InputMaybe<ModelSubscriptionIdInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionTopicFilterInput>>>;
  title?: InputMaybe<ModelSubscriptionStringInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionUserFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionUserFilterInput>>>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  email?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionUserFilterInput>>>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
  userName?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelTopicConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelTopicConditionInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  creatorID?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelTopicConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelTopicConditionInput>>>;
  title?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelTopicConnection = {
  __typename?: 'ModelTopicConnection';
  items: Array<Maybe<Topic>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelTopicFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelTopicFilterInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  creatorID?: InputMaybe<ModelIdInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelTopicFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelTopicFilterInput>>>;
  title?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelUserConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelUserConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  updatedAt?: InputMaybe<ModelStringInput>;
  userName?: InputMaybe<ModelStringInput>;
};

export type ModelUserConnection = {
  __typename?: 'ModelUserConnection';
  items: Array<Maybe<User>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelUserFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserFilterInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelUserFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserFilterInput>>>;
  updatedAt?: InputMaybe<ModelStringInput>;
  userName?: InputMaybe<ModelStringInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewsItem?: Maybe<NewsItem>;
  createPicture?: Maybe<Picture>;
  createPublisher?: Maybe<Publisher>;
  createPublisherCustom: Publisher;
  createPublisherSource?: Maybe<PublisherSource>;
  createTopic?: Maybe<Topic>;
  createUser?: Maybe<User>;
  deleteNewsItem?: Maybe<NewsItem>;
  deletePicture?: Maybe<Picture>;
  deletePublisher?: Maybe<Publisher>;
  deletePublisherSource?: Maybe<PublisherSource>;
  deleteTopic?: Maybe<Topic>;
  deleteUser?: Maybe<User>;
  updateNewsItem?: Maybe<NewsItem>;
  updatePicture?: Maybe<Picture>;
  updatePublisher?: Maybe<Publisher>;
  updatePublisherSource?: Maybe<PublisherSource>;
  updateTopic?: Maybe<Topic>;
  updateUser?: Maybe<User>;
};


export type MutationCreateNewsItemArgs = {
  condition?: InputMaybe<ModelNewsItemConditionInput>;
  input: CreateNewsItemInput;
};


export type MutationCreatePictureArgs = {
  condition?: InputMaybe<ModelPictureConditionInput>;
  input: CreatePictureInput;
};


export type MutationCreatePublisherArgs = {
  condition?: InputMaybe<ModelPublisherConditionInput>;
  input: CreatePublisherInput;
};


export type MutationCreatePublisherCustomArgs = {
  input: CreatePublisherCustomInput;
};


export type MutationCreatePublisherSourceArgs = {
  condition?: InputMaybe<ModelPublisherSourceConditionInput>;
  input: CreatePublisherSourceInput;
};


export type MutationCreateTopicArgs = {
  condition?: InputMaybe<ModelTopicConditionInput>;
  input: CreateTopicInput;
};


export type MutationCreateUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: CreateUserInput;
};


export type MutationDeleteNewsItemArgs = {
  condition?: InputMaybe<ModelNewsItemConditionInput>;
  input: DeleteNewsItemInput;
};


export type MutationDeletePictureArgs = {
  condition?: InputMaybe<ModelPictureConditionInput>;
  input: DeletePictureInput;
};


export type MutationDeletePublisherArgs = {
  condition?: InputMaybe<ModelPublisherConditionInput>;
  input: DeletePublisherInput;
};


export type MutationDeletePublisherSourceArgs = {
  condition?: InputMaybe<ModelPublisherSourceConditionInput>;
  input: DeletePublisherSourceInput;
};


export type MutationDeleteTopicArgs = {
  condition?: InputMaybe<ModelTopicConditionInput>;
  input: DeleteTopicInput;
};


export type MutationDeleteUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: DeleteUserInput;
};


export type MutationUpdateNewsItemArgs = {
  condition?: InputMaybe<ModelNewsItemConditionInput>;
  input: UpdateNewsItemInput;
};


export type MutationUpdatePictureArgs = {
  condition?: InputMaybe<ModelPictureConditionInput>;
  input: UpdatePictureInput;
};


export type MutationUpdatePublisherArgs = {
  condition?: InputMaybe<ModelPublisherConditionInput>;
  input: UpdatePublisherInput;
};


export type MutationUpdatePublisherSourceArgs = {
  condition?: InputMaybe<ModelPublisherSourceConditionInput>;
  input: UpdatePublisherSourceInput;
};


export type MutationUpdateTopicArgs = {
  condition?: InputMaybe<ModelTopicConditionInput>;
  input: UpdateTopicInput;
};


export type MutationUpdateUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: UpdateUserInput;
};

export type NewsItem = {
  __typename?: 'NewsItem';
  cover?: Maybe<Picture>;
  coverID?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  creatorID: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  itunes?: Maybe<NewsItemDataITunes>;
  publishedAt: Scalars['AWSDateTime']['output'];
  publisher: Publisher;
  publisherID: Scalars['ID']['output'];
  rss?: Maybe<NewsItemDataRss>;
  title: Scalars['String']['output'];
  topic: Topic;
  topicID: Scalars['ID']['output'];
  type: SourceType;
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  youtube?: Maybe<NewsItemDataYouTube>;
};

export type NewsItemDataITunes = {
  __typename?: 'NewsItemDataITunes';
  audioUrl: Scalars['String']['output'];
  coverUrl?: Maybe<Scalars['String']['output']>;
  durationFormatted?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Scalars['String']['output']>>;
};

export type NewsItemDataITunesInput = {
  audioUrl: Scalars['String']['input'];
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  durationFormatted?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type NewsItemDataRss = {
  __typename?: 'NewsItemDataRSS';
  ampUrl?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Scalars['String']['output']>>;
  contentHtml?: Maybe<Scalars['String']['output']>;
  contentJson?: Maybe<Scalars['String']['output']>;
  contentText?: Maybe<Scalars['String']['output']>;
  coverUrl?: Maybe<Scalars['String']['output']>;
  isScraped: Scalars['Boolean']['output'];
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  readingDurationInMilliseconds?: Maybe<Scalars['Int']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  wordsCount?: Maybe<Scalars['Int']['output']>;
};

export type NewsItemDataRssInput = {
  ampUrl?: InputMaybe<Scalars['String']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  contentHtml?: InputMaybe<Scalars['String']['input']>;
  contentJson?: InputMaybe<Scalars['String']['input']>;
  contentText?: InputMaybe<Scalars['String']['input']>;
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  isScraped: Scalars['Boolean']['input'];
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  readingDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
  wordsCount?: InputMaybe<Scalars['Int']['input']>;
};

export type NewsItemDataYouTube = {
  __typename?: 'NewsItemDataYouTube';
  coverUrl?: Maybe<Scalars['String']['output']>;
  videoId: Scalars['String']['output'];
};

export type NewsItemDataYouTubeInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['String']['input'];
};

export type Picture = {
  __typename?: 'Picture';
  bucket: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  resized?: Maybe<ResizedPicture>;
  type: PictureType;
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
};


export type PictureResizedArgs = {
  input?: InputMaybe<ResizedImageCustomInput>;
};

export enum PictureType {
  Avatar = 'AVATAR',
  Cover = 'COVER'
}

export type Publisher = {
  __typename?: 'Publisher';
  avatar: Picture;
  avatarID: Scalars['ID']['output'];
  cover?: Maybe<Picture>;
  coverID?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  creatorID: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  news?: Maybe<ModelNewsItemConnection>;
  sources?: Maybe<ModelPublisherSourceConnection>;
  title: Scalars['String']['output'];
  topic: Topic;
  topicID: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
};


export type PublisherNewsArgs = {
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type PublisherSourcesArgs = {
  filter?: InputMaybe<ModelPublisherSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  type?: InputMaybe<ModelStringKeyConditionInput>;
};

export type PublisherSource = {
  __typename?: 'PublisherSource';
  createdAt: Scalars['AWSDateTime']['output'];
  creatorID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isHidden: Scalars['Boolean']['output'];
  itunes?: Maybe<PublisherSourceITunes>;
  publisherID: Scalars['ID']['output'];
  publisherTopicID: Scalars['ID']['output'];
  rss?: Maybe<PublisherSourceRss>;
  title?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<PublisherSourceTwitter>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  website?: Maybe<PublisherSourceWebsite>;
  youtube?: Maybe<PublisherSourceYouTube>;
};

export type PublisherSourceITunes = {
  __typename?: 'PublisherSourceITunes';
  url: Scalars['String']['output'];
};

export type PublisherSourceITunesInput = {
  url: Scalars['String']['input'];
};

export type PublisherSourceRss = {
  __typename?: 'PublisherSourceRSS';
  url: Scalars['String']['output'];
};

export type PublisherSourceRssInput = {
  url: Scalars['String']['input'];
};

export type PublisherSourceTwitter = {
  __typename?: 'PublisherSourceTwitter';
  username: Scalars['String']['output'];
};

export type PublisherSourceTwitterInput = {
  username: Scalars['String']['input'];
};

export type PublisherSourceWebsite = {
  __typename?: 'PublisherSourceWebsite';
  url: Scalars['String']['output'];
};

export type PublisherSourceWebsiteInput = {
  url: Scalars['String']['input'];
};

export type PublisherSourceYouTube = {
  __typename?: 'PublisherSourceYouTube';
  channelID: Scalars['String']['output'];
  playlistUrl?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type PublisherSourceYouTubeInput = {
  channelID: Scalars['String']['input'];
  playlistUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getNewsItem?: Maybe<NewsItem>;
  getNewsItemRSS?: Maybe<NewsItem>;
  getPicture?: Maybe<Picture>;
  getPublisher?: Maybe<Publisher>;
  getPublisherSource?: Maybe<PublisherSource>;
  getTopic?: Maybe<Topic>;
  getUser?: Maybe<User>;
  getUserByUserName?: Maybe<ModelUserConnection>;
  listNewsItems?: Maybe<ModelNewsItemConnection>;
  listPictures?: Maybe<ModelPictureConnection>;
  listPublisherSources?: Maybe<ModelPublisherSourceConnection>;
  listPublishers?: Maybe<ModelPublisherConnection>;
  listTopics?: Maybe<ModelTopicConnection>;
  listUsers?: Maybe<ModelUserConnection>;
  myUser: User;
  newsItemsByCreatorIDAndPublishedAt?: Maybe<ModelNewsItemConnection>;
  newsItemsByPublisherIDAndPublishedAt?: Maybe<ModelNewsItemConnection>;
  newsItemsByTopicIDAndPublishedAt?: Maybe<ModelNewsItemConnection>;
  publisherSourcesByCreatorID?: Maybe<ModelPublisherSourceConnection>;
  publisherSourcesByPublisherIDAndType?: Maybe<ModelPublisherSourceConnection>;
  publisherSourcesByPublisherTopicID?: Maybe<ModelPublisherSourceConnection>;
  publisherSourcesByType?: Maybe<ModelPublisherSourceConnection>;
  publishersByCreatorID?: Maybe<ModelPublisherConnection>;
  publishersByTopicID?: Maybe<ModelPublisherConnection>;
  searchNewsItems?: Maybe<SearchableNewsItemConnection>;
  topicsByCreatorID?: Maybe<ModelTopicConnection>;
};


export type QueryGetNewsItemArgs = {
  id: Scalars['String']['input'];
  publishedAt: Scalars['AWSDateTime']['input'];
};


export type QueryGetNewsItemRssArgs = {
  input: GetNewsItemRssInput;
};


export type QueryGetPictureArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPublisherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPublisherSourceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTopicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByUserNameArgs = {
  filter?: InputMaybe<ModelUserFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  userName: Scalars['String']['input'];
};


export type QueryListNewsItemsArgs = {
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryListPicturesArgs = {
  filter?: InputMaybe<ModelPictureFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListPublisherSourcesArgs = {
  filter?: InputMaybe<ModelPublisherSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListPublishersArgs = {
  filter?: InputMaybe<ModelPublisherFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListTopicsArgs = {
  filter?: InputMaybe<ModelTopicFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListUsersArgs = {
  filter?: InputMaybe<ModelUserFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNewsItemsByCreatorIdAndPublishedAtArgs = {
  creatorID: Scalars['ID']['input'];
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryNewsItemsByPublisherIdAndPublishedAtArgs = {
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  publisherID: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryNewsItemsByTopicIdAndPublishedAtArgs = {
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  topicID: Scalars['ID']['input'];
};


export type QueryPublisherSourcesByCreatorIdArgs = {
  creatorID: Scalars['ID']['input'];
  filter?: InputMaybe<ModelPublisherSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryPublisherSourcesByPublisherIdAndTypeArgs = {
  filter?: InputMaybe<ModelPublisherSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publisherID: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
  type?: InputMaybe<ModelStringKeyConditionInput>;
};


export type QueryPublisherSourcesByPublisherTopicIdArgs = {
  filter?: InputMaybe<ModelPublisherSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publisherTopicID: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryPublisherSourcesByTypeArgs = {
  filter?: InputMaybe<ModelPublisherSourceFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  type: Scalars['String']['input'];
};


export type QueryPublishersByCreatorIdArgs = {
  creatorID: Scalars['ID']['input'];
  filter?: InputMaybe<ModelPublisherFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryPublishersByTopicIdArgs = {
  filter?: InputMaybe<ModelPublisherFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  topicID: Scalars['ID']['input'];
};


export type QuerySearchNewsItemsArgs = {
  aggregates?: InputMaybe<Array<InputMaybe<SearchableNewsItemAggregationInput>>>;
  filter?: InputMaybe<SearchableNewsItemFilterInput>;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableNewsItemSortInput>>>;
};


export type QueryTopicsByCreatorIdArgs = {
  creatorID: Scalars['ID']['input'];
  filter?: InputMaybe<ModelTopicFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type ResizedImageCustomInput = {
  height: Scalars['Int']['input'];
  width: Scalars['Int']['input'];
};

export type ResizedPicture = {
  __typename?: 'ResizedPicture';
  custom: Scalars['String']['output'];
  large: Scalars['String']['output'];
  medium: Scalars['String']['output'];
  original: Scalars['String']['output'];
  small: Scalars['String']['output'];
};

export type ResizedPictureInput = {
  custom: Scalars['String']['input'];
  large: Scalars['String']['input'];
  medium: Scalars['String']['input'];
  original: Scalars['String']['input'];
  small: Scalars['String']['input'];
};

export type SearchableAggregateBucketResult = {
  __typename?: 'SearchableAggregateBucketResult';
  buckets?: Maybe<Array<Maybe<SearchableAggregateBucketResultItem>>>;
};

export type SearchableAggregateBucketResultItem = {
  __typename?: 'SearchableAggregateBucketResultItem';
  doc_count: Scalars['Int']['output'];
  key: Scalars['String']['output'];
};

export type SearchableAggregateGenericResult = SearchableAggregateBucketResult | SearchableAggregateScalarResult;

export type SearchableAggregateResult = {
  __typename?: 'SearchableAggregateResult';
  name: Scalars['String']['output'];
  result?: Maybe<SearchableAggregateGenericResult>;
};

export type SearchableAggregateScalarResult = {
  __typename?: 'SearchableAggregateScalarResult';
  value: Scalars['Float']['output'];
};

export enum SearchableAggregateType {
  Avg = 'avg',
  Max = 'max',
  Min = 'min',
  Sum = 'sum',
  Terms = 'terms'
}

export type SearchableBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchableFloatFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type SearchableIdFilterInput = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  match?: InputMaybe<Scalars['ID']['input']>;
  matchPhrase?: InputMaybe<Scalars['ID']['input']>;
  matchPhrasePrefix?: InputMaybe<Scalars['ID']['input']>;
  multiMatch?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  regexp?: InputMaybe<Scalars['ID']['input']>;
  wildcard?: InputMaybe<Scalars['ID']['input']>;
};

export type SearchableIntFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum SearchableNewsItemAggregateField {
  CoverId = 'coverID',
  CreatedAt = 'createdAt',
  CreatorId = 'creatorID',
  Description = 'description',
  Id = 'id',
  PublishedAt = 'publishedAt',
  PublisherId = 'publisherID',
  Title = 'title',
  TopicId = 'topicID',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type SearchableNewsItemAggregationInput = {
  field: SearchableNewsItemAggregateField;
  name: Scalars['String']['input'];
  type: SearchableAggregateType;
};

export type SearchableNewsItemConnection = {
  __typename?: 'SearchableNewsItemConnection';
  aggregateItems: Array<Maybe<SearchableAggregateResult>>;
  items: Array<Maybe<NewsItem>>;
  nextToken?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SearchableNewsItemFilterInput = {
  and?: InputMaybe<Array<InputMaybe<SearchableNewsItemFilterInput>>>;
  coverID?: InputMaybe<SearchableIdFilterInput>;
  createdAt?: InputMaybe<SearchableStringFilterInput>;
  creatorID?: InputMaybe<SearchableIdFilterInput>;
  description?: InputMaybe<SearchableStringFilterInput>;
  id?: InputMaybe<SearchableStringFilterInput>;
  not?: InputMaybe<SearchableNewsItemFilterInput>;
  or?: InputMaybe<Array<InputMaybe<SearchableNewsItemFilterInput>>>;
  publishedAt?: InputMaybe<SearchableStringFilterInput>;
  publisherID?: InputMaybe<SearchableIdFilterInput>;
  title?: InputMaybe<SearchableStringFilterInput>;
  topicID?: InputMaybe<SearchableIdFilterInput>;
  type?: InputMaybe<SearchableStringFilterInput>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
};

export type SearchableNewsItemSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableNewsItemSortableFields>;
};

export enum SearchableNewsItemSortableFields {
  CoverId = 'coverID',
  CreatedAt = 'createdAt',
  CreatorId = 'creatorID',
  Description = 'description',
  Id = 'id',
  PublishedAt = 'publishedAt',
  PublisherId = 'publisherID',
  Title = 'title',
  TopicId = 'topicID',
  UpdatedAt = 'updatedAt'
}

export enum SearchableSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SearchableStringFilterInput = {
  eq?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  match?: InputMaybe<Scalars['String']['input']>;
  matchPhrase?: InputMaybe<Scalars['String']['input']>;
  matchPhrasePrefix?: InputMaybe<Scalars['String']['input']>;
  multiMatch?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regexp?: InputMaybe<Scalars['String']['input']>;
  wildcard?: InputMaybe<Scalars['String']['input']>;
};

export enum SourceType {
  Custom = 'CUSTOM',
  Itunes = 'ITUNES',
  Rss = 'RSS',
  Twitter = 'TWITTER',
  Website = 'WEBSITE',
  Youtube = 'YOUTUBE'
}

export type Subscription = {
  __typename?: 'Subscription';
  onCreateNewsItem?: Maybe<NewsItem>;
  onCreatePicture?: Maybe<Picture>;
  onCreatePublisher?: Maybe<Publisher>;
  onCreatePublisherSource?: Maybe<PublisherSource>;
  onCreateTopic?: Maybe<Topic>;
  onCreateUser?: Maybe<User>;
  onDeleteNewsItem?: Maybe<NewsItem>;
  onDeletePicture?: Maybe<Picture>;
  onDeletePublisher?: Maybe<Publisher>;
  onDeletePublisherSource?: Maybe<PublisherSource>;
  onDeleteTopic?: Maybe<Topic>;
  onDeleteUser?: Maybe<User>;
  onUpdateNewsItem?: Maybe<NewsItem>;
  onUpdatePicture?: Maybe<Picture>;
  onUpdatePublisher?: Maybe<Publisher>;
  onUpdatePublisherSource?: Maybe<PublisherSource>;
  onUpdateTopic?: Maybe<Topic>;
  onUpdateUser?: Maybe<User>;
};


export type SubscriptionOnCreateNewsItemArgs = {
  filter?: InputMaybe<ModelSubscriptionNewsItemFilterInput>;
};


export type SubscriptionOnCreatePictureArgs = {
  filter?: InputMaybe<ModelSubscriptionPictureFilterInput>;
};


export type SubscriptionOnCreatePublisherArgs = {
  filter?: InputMaybe<ModelSubscriptionPublisherFilterInput>;
};


export type SubscriptionOnCreatePublisherSourceArgs = {
  filter?: InputMaybe<ModelSubscriptionPublisherSourceFilterInput>;
};


export type SubscriptionOnCreateTopicArgs = {
  filter?: InputMaybe<ModelSubscriptionTopicFilterInput>;
};


export type SubscriptionOnCreateUserArgs = {
  filter?: InputMaybe<ModelSubscriptionUserFilterInput>;
};


export type SubscriptionOnDeleteNewsItemArgs = {
  filter?: InputMaybe<ModelSubscriptionNewsItemFilterInput>;
};


export type SubscriptionOnDeletePictureArgs = {
  filter?: InputMaybe<ModelSubscriptionPictureFilterInput>;
};


export type SubscriptionOnDeletePublisherArgs = {
  filter?: InputMaybe<ModelSubscriptionPublisherFilterInput>;
};


export type SubscriptionOnDeletePublisherSourceArgs = {
  filter?: InputMaybe<ModelSubscriptionPublisherSourceFilterInput>;
};


export type SubscriptionOnDeleteTopicArgs = {
  filter?: InputMaybe<ModelSubscriptionTopicFilterInput>;
};


export type SubscriptionOnDeleteUserArgs = {
  filter?: InputMaybe<ModelSubscriptionUserFilterInput>;
};


export type SubscriptionOnUpdateNewsItemArgs = {
  filter?: InputMaybe<ModelSubscriptionNewsItemFilterInput>;
};


export type SubscriptionOnUpdatePictureArgs = {
  filter?: InputMaybe<ModelSubscriptionPictureFilterInput>;
};


export type SubscriptionOnUpdatePublisherArgs = {
  filter?: InputMaybe<ModelSubscriptionPublisherFilterInput>;
};


export type SubscriptionOnUpdatePublisherSourceArgs = {
  filter?: InputMaybe<ModelSubscriptionPublisherSourceFilterInput>;
};


export type SubscriptionOnUpdateTopicArgs = {
  filter?: InputMaybe<ModelSubscriptionTopicFilterInput>;
};


export type SubscriptionOnUpdateUserArgs = {
  filter?: InputMaybe<ModelSubscriptionUserFilterInput>;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  creatorID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  news?: Maybe<ModelNewsItemConnection>;
  publishers?: Maybe<ModelPublisherConnection>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
};


export type TopicNewsArgs = {
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type TopicPublishersArgs = {
  filter?: InputMaybe<ModelPublisherFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type UpdateNewsItemInput = {
  coverID?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  creatorID?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  itunes?: InputMaybe<NewsItemDataITunesInput>;
  publishedAt: Scalars['AWSDateTime']['input'];
  publisherID?: InputMaybe<Scalars['ID']['input']>;
  rss?: InputMaybe<NewsItemDataRssInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  topicID?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<SourceType>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  youtube?: InputMaybe<NewsItemDataYouTubeInput>;
};

export type UpdatePictureInput = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  id: Scalars['ID']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  resized?: InputMaybe<ResizedPictureInput>;
  type?: InputMaybe<PictureType>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type UpdatePublisherInput = {
  avatarID?: InputMaybe<Scalars['ID']['input']>;
  coverID?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  creatorID?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  topicID?: InputMaybe<Scalars['ID']['input']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type UpdatePublisherSourceInput = {
  creatorID?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  itunes?: InputMaybe<PublisherSourceITunesInput>;
  publisherID?: InputMaybe<Scalars['ID']['input']>;
  publisherTopicID?: InputMaybe<Scalars['ID']['input']>;
  rss?: InputMaybe<PublisherSourceRssInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<PublisherSourceTwitterInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<PublisherSourceWebsiteInput>;
  youtube?: InputMaybe<PublisherSourceYouTubeInput>;
};

export type UpdateTopicInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  creatorID?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

export type UpdateUserInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  updatedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['AWSDateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  news?: Maybe<ModelNewsItemConnection>;
  publishers?: Maybe<ModelPublisherConnection>;
  topics?: Maybe<ModelTopicConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
  userName: Scalars['String']['output'];
};


export type UserNewsArgs = {
  filter?: InputMaybe<ModelNewsItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<ModelStringKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type UserPublishersArgs = {
  filter?: InputMaybe<ModelPublisherFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type UserTopicsArgs = {
  filter?: InputMaybe<ModelTopicFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type BaseNewsItemFragment = { __typename?: 'NewsItem', id: string, title: string, description: string, type: SourceType, publishedAt: Date, cover?: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } | null, rss?: { __typename?: 'NewsItemDataRSS', url: string, coverUrl?: string | null } | null, youtube?: { __typename?: 'NewsItemDataYouTube', videoId: string, coverUrl?: string | null } | null, itunes?: { __typename?: 'NewsItemDataITunes', audioUrl: string, coverUrl?: string | null, durationFormatted?: string | null } | null, publisher: { __typename?: 'Publisher', id: string, title: string, avatar: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } } };

export type GetNewsFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsFeedQuery = { __typename?: 'Query', myUser: { __typename?: 'User', id: string, news?: { __typename?: 'ModelNewsItemConnection', items: Array<{ __typename?: 'NewsItem', id: string, title: string, description: string, type: SourceType, publishedAt: Date, cover?: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } | null, rss?: { __typename?: 'NewsItemDataRSS', url: string, coverUrl?: string | null } | null, youtube?: { __typename?: 'NewsItemDataYouTube', videoId: string, coverUrl?: string | null } | null, itunes?: { __typename?: 'NewsItemDataITunes', audioUrl: string, coverUrl?: string | null, durationFormatted?: string | null } | null, publisher: { __typename?: 'Publisher', id: string, title: string, avatar: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } } } | null> } | null } };

export type PublisherInfoFragment = { __typename?: 'Publisher', id: string, title: string, avatar: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } };

export type CreatePublisherMutationVariables = Exact<{
  input: CreatePublisherCustomInput;
}>;


export type CreatePublisherMutation = { __typename?: 'Mutation', createPublisherCustom: { __typename?: 'Publisher', id: string, title: string, avatar: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } } };

export type ListPublishersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPublishersQuery = { __typename?: 'Query', myUser: { __typename?: 'User', topics?: { __typename?: 'ModelTopicConnection', items: Array<{ __typename?: 'Topic', id: string, title: string, publishers?: { __typename?: 'ModelPublisherConnection', items: Array<{ __typename?: 'Publisher', id: string, title: string, avatar: { __typename?: 'Picture', resized?: { __typename?: 'ResizedPicture', medium: string } | null } } | null> } | null } | null> } | null } };

export type BaseTopicFragment = { __typename?: 'Topic', id: string, title: string };

export type CreateTopicMutationVariables = Exact<{
  input: CreateTopicInput;
}>;


export type CreateTopicMutation = { __typename?: 'Mutation', createTopic?: { __typename?: 'Topic', id: string, title: string } | null };

export type BaseUserFragment = { __typename?: 'User', id: string };

export const PublisherInfoFragmentDoc = gql`
    fragment PublisherInfo on Publisher {
  id
  title
  avatar {
    resized {
      medium
    }
  }
}
    `;
export const BaseNewsItemFragmentDoc = gql`
    fragment BaseNewsItem on NewsItem {
  id
  title
  description
  type
  publishedAt
  cover {
    resized {
      medium
    }
  }
  rss {
    url
    coverUrl
  }
  youtube {
    videoId
    coverUrl
  }
  itunes {
    audioUrl
    coverUrl
    durationFormatted
  }
  publisher {
    ...PublisherInfo
  }
}
    ${PublisherInfoFragmentDoc}`;
export const BaseTopicFragmentDoc = gql`
    fragment BaseTopic on Topic {
  id
  title
}
    `;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
}
    `;
export const GetNewsFeedDocument = gql`
    query GetNewsFeed {
  myUser {
    ...BaseUser
    news {
      items {
        ...BaseNewsItem
      }
    }
  }
}
    ${BaseUserFragmentDoc}
${BaseNewsItemFragmentDoc}`;

/**
 * __useGetNewsFeedQuery__
 *
 * To run a query within a React component, call `useGetNewsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewsFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNewsFeedQuery(baseOptions?: Apollo.QueryHookOptions<GetNewsFeedQuery, GetNewsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNewsFeedQuery, GetNewsFeedQueryVariables>(GetNewsFeedDocument, options);
      }
export function useGetNewsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewsFeedQuery, GetNewsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNewsFeedQuery, GetNewsFeedQueryVariables>(GetNewsFeedDocument, options);
        }
export type GetNewsFeedQueryHookResult = ReturnType<typeof useGetNewsFeedQuery>;
export type GetNewsFeedLazyQueryHookResult = ReturnType<typeof useGetNewsFeedLazyQuery>;
export type GetNewsFeedQueryResult = Apollo.QueryResult<GetNewsFeedQuery, GetNewsFeedQueryVariables>;
export const CreatePublisherDocument = gql`
    mutation CreatePublisher($input: CreatePublisherCustomInput!) {
  createPublisherCustom(input: $input) {
    ...PublisherInfo
  }
}
    ${PublisherInfoFragmentDoc}`;
export type CreatePublisherMutationFn = Apollo.MutationFunction<CreatePublisherMutation, CreatePublisherMutationVariables>;

/**
 * __useCreatePublisherMutation__
 *
 * To run a mutation, you first call `useCreatePublisherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePublisherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPublisherMutation, { data, loading, error }] = useCreatePublisherMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePublisherMutation(baseOptions?: Apollo.MutationHookOptions<CreatePublisherMutation, CreatePublisherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePublisherMutation, CreatePublisherMutationVariables>(CreatePublisherDocument, options);
      }
export type CreatePublisherMutationHookResult = ReturnType<typeof useCreatePublisherMutation>;
export type CreatePublisherMutationResult = Apollo.MutationResult<CreatePublisherMutation>;
export type CreatePublisherMutationOptions = Apollo.BaseMutationOptions<CreatePublisherMutation, CreatePublisherMutationVariables>;
export const ListPublishersDocument = gql`
    query ListPublishers {
  myUser {
    topics {
      items {
        ...BaseTopic
        publishers {
          items {
            ...PublisherInfo
          }
        }
      }
    }
  }
}
    ${BaseTopicFragmentDoc}
${PublisherInfoFragmentDoc}`;

/**
 * __useListPublishersQuery__
 *
 * To run a query within a React component, call `useListPublishersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPublishersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPublishersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPublishersQuery(baseOptions?: Apollo.QueryHookOptions<ListPublishersQuery, ListPublishersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPublishersQuery, ListPublishersQueryVariables>(ListPublishersDocument, options);
      }
export function useListPublishersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPublishersQuery, ListPublishersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPublishersQuery, ListPublishersQueryVariables>(ListPublishersDocument, options);
        }
export type ListPublishersQueryHookResult = ReturnType<typeof useListPublishersQuery>;
export type ListPublishersLazyQueryHookResult = ReturnType<typeof useListPublishersLazyQuery>;
export type ListPublishersQueryResult = Apollo.QueryResult<ListPublishersQuery, ListPublishersQueryVariables>;
export const CreateTopicDocument = gql`
    mutation CreateTopic($input: CreateTopicInput!) {
  createTopic(input: $input) {
    ...BaseTopic
  }
}
    ${BaseTopicFragmentDoc}`;
export type CreateTopicMutationFn = Apollo.MutationFunction<CreateTopicMutation, CreateTopicMutationVariables>;

/**
 * __useCreateTopicMutation__
 *
 * To run a mutation, you first call `useCreateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicMutation, { data, loading, error }] = useCreateTopicMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTopicMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicMutation, CreateTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopicMutation, CreateTopicMutationVariables>(CreateTopicDocument, options);
      }
export type CreateTopicMutationHookResult = ReturnType<typeof useCreateTopicMutation>;
export type CreateTopicMutationResult = Apollo.MutationResult<CreateTopicMutation>;
export type CreateTopicMutationOptions = Apollo.BaseMutationOptions<CreateTopicMutation, CreateTopicMutationVariables>;