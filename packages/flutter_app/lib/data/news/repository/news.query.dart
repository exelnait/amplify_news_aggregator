import 'news.query.graphql.dart';

typedef GetNewsItemRSSQuery = Query$GetNewsItemRSS;
typedef GetNewsItemRSSQueryVariables = Variables$Query$GetNewsItemRSS;
typedef GetNewsItemRSSQueryOptions = Options$Query$GetNewsItemRSS;

typedef PublisherWithNewsFeedQuery = Query$GetPublisherWithNewsFeed;
typedef PublisherWithNewsFeedQueryOptions = Options$Query$GetPublisherWithNewsFeed;
typedef PublisherWithNewsFeedQueryVariables = Variables$Query$GetPublisherWithNewsFeed;
const useQueryGetPublisherWithNewsFeed = useQuery$GetPublisherWithNewsFeed;

typedef PublisherNewsFeedByTypeQuery = Query$GetPublisherNewsFeedByType;
typedef PublisherNewsFeedByTypeQueryOptions = Options$Query$GetPublisherNewsFeedByType;
typedef PublisherNewsFeedByTypeQueryVariables = Variables$Query$GetPublisherNewsFeedByType;
const useQueryGetPublisherNewsFeedByType = useQuery$GetPublisherNewsFeedByType;



typedef UserNewsFeedQuery = Query$GetUserNewsFeed;
typedef UserNewsFeedQueryOptions = Options$Query$GetUserNewsFeed;
typedef UserNewsFeedQueryVariables = Variables$Query$GetUserNewsFeed;
const useQueryGetUserNewsFeed = useQuery$GetUserNewsFeed;