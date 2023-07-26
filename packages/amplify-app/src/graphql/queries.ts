/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const myUser = /* GraphQL */ `
  query MyUser {
    myUser {
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
export const getNewsItemRSS = /* GraphQL */ `
  query GetNewsItemRSS($input: GetNewsItemRSSInput!) {
    getNewsItemRSS(input: $input) {
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
export const searchNewsItems = /* GraphQL */ `
  query SearchNewsItems(
    $filter: SearchableNewsItemFilterInput
    $sort: [SearchableNewsItemSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableNewsItemAggregationInput]
  ) {
    searchNewsItems(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
          avatarID
          coverID
          creatorID
          __typename
        }
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getTopic = /* GraphQL */ `
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
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
export const listTopics = /* GraphQL */ `
  query ListTopics(
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPicture = /* GraphQL */ `
  query GetPicture($id: ID!) {
    getPicture(id: $id) {
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
export const listPictures = /* GraphQL */ `
  query ListPictures(
    $filter: ModelPictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getNewsItem = /* GraphQL */ `
  query GetNewsItem($id: String!, $publishedAt: AWSDateTime!) {
    getNewsItem(id: $id, publishedAt: $publishedAt) {
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
export const listNewsItems = /* GraphQL */ `
  query ListNewsItems(
    $id: String
    $publishedAt: ModelStringKeyConditionInput
    $filter: ModelNewsItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNewsItems(
      id: $id
      publishedAt: $publishedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          avatarID
          coverID
          creatorID
          __typename
        }
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
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
      nextToken
      __typename
    }
  }
`;
export const getPublisherSource = /* GraphQL */ `
  query GetPublisherSource($id: ID!) {
    getPublisherSource(id: $id) {
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
export const listPublisherSources = /* GraphQL */ `
  query ListPublisherSources(
    $filter: ModelPublisherSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublisherSources(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPublisher = /* GraphQL */ `
  query GetPublisher($id: ID!) {
    getPublisher(id: $id) {
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
export const listPublishers = /* GraphQL */ `
  query ListPublishers(
    $filter: ModelPublisherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublishers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        email
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        topics {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const topicsByCreatorID = /* GraphQL */ `
  query TopicsByCreatorID(
    $creatorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    topicsByCreatorID(
      creatorID: $creatorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const newsItemsByPublisherIDAndPublishedAt = /* GraphQL */ `
  query NewsItemsByPublisherIDAndPublishedAt(
    $publisherID: ID!
    $publishedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNewsItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsItemsByPublisherIDAndPublishedAt(
      publisherID: $publisherID
      publishedAt: $publishedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          avatarID
          coverID
          creatorID
          __typename
        }
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
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
      nextToken
      __typename
    }
  }
`;
export const newsItemsByTopicIDAndPublishedAt = /* GraphQL */ `
  query NewsItemsByTopicIDAndPublishedAt(
    $topicID: ID!
    $publishedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNewsItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsItemsByTopicIDAndPublishedAt(
      topicID: $topicID
      publishedAt: $publishedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          avatarID
          coverID
          creatorID
          __typename
        }
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
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
      nextToken
      __typename
    }
  }
`;
export const newsItemsByCreatorIDAndPublishedAt = /* GraphQL */ `
  query NewsItemsByCreatorIDAndPublishedAt(
    $creatorID: ID!
    $publishedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNewsItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsItemsByCreatorIDAndPublishedAt(
      creatorID: $creatorID
      publishedAt: $publishedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          avatarID
          coverID
          creatorID
          __typename
        }
        topicID
        topic {
          id
          title
          createdAt
          updatedAt
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
      nextToken
      __typename
    }
  }
`;
export const publisherSourcesByType = /* GraphQL */ `
  query PublisherSourcesByType(
    $type: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPublisherSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publisherSourcesByType(
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const publisherSourcesByPublisherTopicID = /* GraphQL */ `
  query PublisherSourcesByPublisherTopicID(
    $publisherTopicID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPublisherSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publisherSourcesByPublisherTopicID(
      publisherTopicID: $publisherTopicID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const publisherSourcesByPublisherIDAndType = /* GraphQL */ `
  query PublisherSourcesByPublisherIDAndType(
    $publisherID: ID!
    $type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPublisherSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publisherSourcesByPublisherIDAndType(
      publisherID: $publisherID
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const publisherSourcesByCreatorID = /* GraphQL */ `
  query PublisherSourcesByCreatorID(
    $creatorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPublisherSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publisherSourcesByCreatorID(
      creatorID: $creatorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const publishersByTopicID = /* GraphQL */ `
  query PublishersByTopicID(
    $topicID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPublisherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publishersByTopicID(
      topicID: $topicID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const publishersByCreatorID = /* GraphQL */ `
  query PublishersByCreatorID(
    $creatorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPublisherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publishersByCreatorID(
      creatorID: $creatorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUserByUserName = /* GraphQL */ `
  query GetUserByUserName(
    $userName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByUserName(
      userName: $userName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userName
        email
        createdAt
        updatedAt
        publishers {
          nextToken
          __typename
        }
        topics {
          nextToken
          __typename
        }
        news {
          nextToken
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
