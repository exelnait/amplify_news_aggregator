/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onCreateTopic(filter: $filter) {
      id
      title
      createdAt
      updatedAt
      publishers {
        items {
          id
          title
          description
          createdAt
          updatedAt
          topicID
          avatarID
          coverID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      __typename
    }
  }
`;
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onUpdateTopic(filter: $filter) {
      id
      title
      createdAt
      updatedAt
      publishers {
        items {
          id
          title
          description
          createdAt
          updatedAt
          topicID
          avatarID
          coverID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      __typename
    }
  }
`;
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic($filter: ModelSubscriptionTopicFilterInput) {
    onDeleteTopic(filter: $filter) {
      id
      title
      createdAt
      updatedAt
      publishers {
        items {
          id
          title
          description
          createdAt
          updatedAt
          topicID
          avatarID
          coverID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      __typename
    }
  }
`;
export const onCreatePicture = /* GraphQL */ `
  subscription OnCreatePicture($filter: ModelSubscriptionPictureFilterInput) {
    onCreatePicture(filter: $filter) {
      id
      type
      bucket
      key
      resized {
        original
        custom
        small
        medium
        large
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePicture = /* GraphQL */ `
  subscription OnUpdatePicture($filter: ModelSubscriptionPictureFilterInput) {
    onUpdatePicture(filter: $filter) {
      id
      type
      bucket
      key
      resized {
        original
        custom
        small
        medium
        large
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePicture = /* GraphQL */ `
  subscription OnDeletePicture($filter: ModelSubscriptionPictureFilterInput) {
    onDeletePicture(filter: $filter) {
      id
      type
      bucket
      key
      resized {
        original
        custom
        small
        medium
        large
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateNewsItem = /* GraphQL */ `
  subscription OnCreateNewsItem($filter: ModelSubscriptionNewsItemFilterInput) {
    onCreateNewsItem(filter: $filter) {
      id
      type
      title
      description
      publishedAt
      createdAt
      updatedAt
      coverID
      cover {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      publisherID
      publisher {
        id
        title
        description
        createdAt
        updatedAt
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
          creatorID
          __typename
        }
        sources {
          nextToken
          __typename
        }
        avatarID
        avatar {
          id
          type
          bucket
          key
          createdAt
          updatedAt
          __typename
        }
        coverID
        cover {
          id
          type
          bucket
          key
          createdAt
          updatedAt
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      topicID
      topic {
        id
        title
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      creatorID
      rss {
        url
        ampUrl
        categories
        author
        isScraped
        coverUrl
        contentHtml
        contentText
        contentJson
        wordsCount
        readingDurationInMilliseconds
        keywords
        summary
        __typename
      }
      youtube {
        videoId
        coverUrl
        __typename
      }
      itunes {
        audioUrl
        coverUrl
        keywords
        durationFormatted
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateNewsItem = /* GraphQL */ `
  subscription OnUpdateNewsItem($filter: ModelSubscriptionNewsItemFilterInput) {
    onUpdateNewsItem(filter: $filter) {
      id
      type
      title
      description
      publishedAt
      createdAt
      updatedAt
      coverID
      cover {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      publisherID
      publisher {
        id
        title
        description
        createdAt
        updatedAt
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
          creatorID
          __typename
        }
        sources {
          nextToken
          __typename
        }
        avatarID
        avatar {
          id
          type
          bucket
          key
          createdAt
          updatedAt
          __typename
        }
        coverID
        cover {
          id
          type
          bucket
          key
          createdAt
          updatedAt
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      topicID
      topic {
        id
        title
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      creatorID
      rss {
        url
        ampUrl
        categories
        author
        isScraped
        coverUrl
        contentHtml
        contentText
        contentJson
        wordsCount
        readingDurationInMilliseconds
        keywords
        summary
        __typename
      }
      youtube {
        videoId
        coverUrl
        __typename
      }
      itunes {
        audioUrl
        coverUrl
        keywords
        durationFormatted
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteNewsItem = /* GraphQL */ `
  subscription OnDeleteNewsItem($filter: ModelSubscriptionNewsItemFilterInput) {
    onDeleteNewsItem(filter: $filter) {
      id
      type
      title
      description
      publishedAt
      createdAt
      updatedAt
      coverID
      cover {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      publisherID
      publisher {
        id
        title
        description
        createdAt
        updatedAt
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
          creatorID
          __typename
        }
        sources {
          nextToken
          __typename
        }
        avatarID
        avatar {
          id
          type
          bucket
          key
          createdAt
          updatedAt
          __typename
        }
        coverID
        cover {
          id
          type
          bucket
          key
          createdAt
          updatedAt
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      topicID
      topic {
        id
        title
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      creatorID
      rss {
        url
        ampUrl
        categories
        author
        isScraped
        coverUrl
        contentHtml
        contentText
        contentJson
        wordsCount
        readingDurationInMilliseconds
        keywords
        summary
        __typename
      }
      youtube {
        videoId
        coverUrl
        __typename
      }
      itunes {
        audioUrl
        coverUrl
        keywords
        durationFormatted
        __typename
      }
      __typename
    }
  }
`;
export const onCreatePublisherSource = /* GraphQL */ `
  subscription OnCreatePublisherSource(
    $filter: ModelSubscriptionPublisherSourceFilterInput
  ) {
    onCreatePublisherSource(filter: $filter) {
      id
      type
      title
      isHidden
      publisherTopicID
      publisherID
      website {
        url
        __typename
      }
      rss {
        url
        __typename
      }
      youtube {
        playlistUrl
        channelID
        username
        __typename
      }
      twitter {
        username
        __typename
      }
      itunes {
        url
        __typename
      }
      creatorID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePublisherSource = /* GraphQL */ `
  subscription OnUpdatePublisherSource(
    $filter: ModelSubscriptionPublisherSourceFilterInput
  ) {
    onUpdatePublisherSource(filter: $filter) {
      id
      type
      title
      isHidden
      publisherTopicID
      publisherID
      website {
        url
        __typename
      }
      rss {
        url
        __typename
      }
      youtube {
        playlistUrl
        channelID
        username
        __typename
      }
      twitter {
        username
        __typename
      }
      itunes {
        url
        __typename
      }
      creatorID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePublisherSource = /* GraphQL */ `
  subscription OnDeletePublisherSource(
    $filter: ModelSubscriptionPublisherSourceFilterInput
  ) {
    onDeletePublisherSource(filter: $filter) {
      id
      type
      title
      isHidden
      publisherTopicID
      publisherID
      website {
        url
        __typename
      }
      rss {
        url
        __typename
      }
      youtube {
        playlistUrl
        channelID
        username
        __typename
      }
      twitter {
        username
        __typename
      }
      itunes {
        url
        __typename
      }
      creatorID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePublisher = /* GraphQL */ `
  subscription OnCreatePublisher(
    $filter: ModelSubscriptionPublisherFilterInput
  ) {
    onCreatePublisher(filter: $filter) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      sources {
        items {
          id
          type
          title
          isHidden
          publisherTopicID
          publisherID
          creatorID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      avatarID
      avatar {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      coverID
      cover {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      __typename
    }
  }
`;
export const onUpdatePublisher = /* GraphQL */ `
  subscription OnUpdatePublisher(
    $filter: ModelSubscriptionPublisherFilterInput
  ) {
    onUpdatePublisher(filter: $filter) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      sources {
        items {
          id
          type
          title
          isHidden
          publisherTopicID
          publisherID
          creatorID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      avatarID
      avatar {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      coverID
      cover {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      __typename
    }
  }
`;
export const onDeletePublisher = /* GraphQL */ `
  subscription OnDeletePublisher(
    $filter: ModelSubscriptionPublisherFilterInput
  ) {
    onDeletePublisher(filter: $filter) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        creatorID
        __typename
      }
      sources {
        items {
          id
          type
          title
          isHidden
          publisherTopicID
          publisherID
          creatorID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      avatarID
      avatar {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      coverID
      cover {
        id
        type
        bucket
        key
        resized {
          original
          custom
          small
          medium
          large
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      userName
      email
      createdAt
      updatedAt
      publishers {
        items {
          id
          title
          description
          createdAt
          updatedAt
          topicID
          avatarID
          coverID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      topics {
        items {
          id
          title
          createdAt
          updatedAt
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      userName
      email
      createdAt
      updatedAt
      publishers {
        items {
          id
          title
          description
          createdAt
          updatedAt
          topicID
          avatarID
          coverID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      topics {
        items {
          id
          title
          createdAt
          updatedAt
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      userName
      email
      createdAt
      updatedAt
      publishers {
        items {
          id
          title
          description
          createdAt
          updatedAt
          topicID
          avatarID
          coverID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      topics {
        items {
          id
          title
          createdAt
          updatedAt
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      news {
        items {
          id
          type
          title
          description
          publishedAt
          createdAt
          updatedAt
          coverID
          publisherID
          topicID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
