/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPublisherCustom = /* GraphQL */ `
  mutation CreatePublisherCustom($input: CreatePublisherCustomInput!) {
    createPublisherCustom(input: $input) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        description
        type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createTopic = /* GraphQL */ `
  mutation CreateTopic(
    $input: CreateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    createTopic(input: $input, condition: $condition) {
      id
      title
      description
      type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const updateTopic = /* GraphQL */ `
  mutation UpdateTopic(
    $input: UpdateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    updateTopic(input: $input, condition: $condition) {
      id
      title
      description
      type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const deleteTopic = /* GraphQL */ `
  mutation DeleteTopic(
    $input: DeleteTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    deleteTopic(input: $input, condition: $condition) {
      id
      title
      description
      type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createPicture = /* GraphQL */ `
  mutation CreatePicture(
    $input: CreatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    createPicture(input: $input, condition: $condition) {
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
export const updatePicture = /* GraphQL */ `
  mutation UpdatePicture(
    $input: UpdatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    updatePicture(input: $input, condition: $condition) {
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
export const deletePicture = /* GraphQL */ `
  mutation DeletePicture(
    $input: DeletePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    deletePicture(input: $input, condition: $condition) {
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
export const createNewsItem = /* GraphQL */ `
  mutation CreateNewsItem(
    $input: CreateNewsItemInput!
    $condition: ModelNewsItemConditionInput
  ) {
    createNewsItem(input: $input, condition: $condition) {
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
          description
          type
          createdAt
          updatedAt
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
        __typename
      }
      topicID
      topic {
        id
        title
        description
        type
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
        __typename
      }
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
      viewsCount
      __typename
    }
  }
`;
export const updateNewsItem = /* GraphQL */ `
  mutation UpdateNewsItem(
    $input: UpdateNewsItemInput!
    $condition: ModelNewsItemConditionInput
  ) {
    updateNewsItem(input: $input, condition: $condition) {
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
          description
          type
          createdAt
          updatedAt
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
        __typename
      }
      topicID
      topic {
        id
        title
        description
        type
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
        __typename
      }
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
      viewsCount
      __typename
    }
  }
`;
export const deleteNewsItem = /* GraphQL */ `
  mutation DeleteNewsItem(
    $input: DeleteNewsItemInput!
    $condition: ModelNewsItemConditionInput
  ) {
    deleteNewsItem(input: $input, condition: $condition) {
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
          description
          type
          createdAt
          updatedAt
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
        __typename
      }
      topicID
      topic {
        id
        title
        description
        type
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
        __typename
      }
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
      viewsCount
      __typename
    }
  }
`;
export const createPublisherSource = /* GraphQL */ `
  mutation CreatePublisherSource(
    $input: CreatePublisherSourceInput!
    $condition: ModelPublisherSourceConditionInput
  ) {
    createPublisherSource(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePublisherSource = /* GraphQL */ `
  mutation UpdatePublisherSource(
    $input: UpdatePublisherSourceInput!
    $condition: ModelPublisherSourceConditionInput
  ) {
    updatePublisherSource(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePublisherSource = /* GraphQL */ `
  mutation DeletePublisherSource(
    $input: DeletePublisherSourceInput!
    $condition: ModelPublisherSourceConditionInput
  ) {
    deletePublisherSource(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPublisher = /* GraphQL */ `
  mutation CreatePublisher(
    $input: CreatePublisherInput!
    $condition: ModelPublisherConditionInput
  ) {
    createPublisher(input: $input, condition: $condition) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        description
        type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const updatePublisher = /* GraphQL */ `
  mutation UpdatePublisher(
    $input: UpdatePublisherInput!
    $condition: ModelPublisherConditionInput
  ) {
    updatePublisher(input: $input, condition: $condition) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        description
        type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const deletePublisher = /* GraphQL */ `
  mutation DeletePublisher(
    $input: DeletePublisherInput!
    $condition: ModelPublisherConditionInput
  ) {
    deletePublisher(input: $input, condition: $condition) {
      id
      title
      description
      createdAt
      updatedAt
      topicID
      topic {
        id
        title
        description
        type
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
          viewsCount
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      userName
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      userName
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      userName
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
