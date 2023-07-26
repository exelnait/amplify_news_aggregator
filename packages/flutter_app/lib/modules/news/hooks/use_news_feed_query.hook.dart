import 'package:amplify_core/amplify_core.dart';
import 'package:built_collection/built_collection.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

class UseNewsFeedQueryHookData {
  UseNewsFeedQueryHookData({
    required this.isLoading,
    required this.hasMore,
    required this.onFetchMore,
    required this.news,
    this.exception,
  });

  final bool isLoading;
  final bool hasMore;
  final Function() onFetchMore;
  final String? exception;
  final List<NewsItemModel> news;
}

typedef GetNewsItemsFromQueryResult<Q> = List<dynamic>? Function(Q? result);

typedef GetNextTokenFromQueryResult<Q, T> = T? Function(Q? result);
typedef CalculateNextTokenQueryVariables<T> = Map<String, dynamic> Function(
    T? nextToken);

UseNewsFeedQueryHookData useNewsFeedQuery<Q, T>({
  required QueryHookResult<Q> queryResult,
  required GetNewsItemsFromQueryResult<Q> getNewsItemsFromQueryResult,
  required GetNextTokenFromQueryResult<Q, T> getNextTokenFromQueryResult,
  required CalculateNextTokenQueryVariables<T> calculateNextTokenQueryVariables,
}) {
  var isLoading = useState(true);
  var hasMore = useState(true);
  var nextToken = useState<T?>(null);
  var news = useState<BuiltList<NewsItemModel>>(BuiltList());

  if (queryResult.result.hasException) {
    return UseNewsFeedQueryHookData(
      isLoading: isLoading.value,
      hasMore: hasMore.value,
      onFetchMore: () {},
      news: news.value.toList(),
      exception: queryResult.result.exception.toString(),
    );
  }
  final onFetchMore = useCallback(() {
    if (hasMore.value && !isLoading.value) {
      safePrint('try fetch more');
      safePrint('isLoading ${isLoading.value}');
      var variables = calculateNextTokenQueryVariables(nextToken.value);
      FetchMoreOptions opts = FetchMoreOptions(
        variables: variables,
        updateQuery: (previousResultData, fetchMoreResultData) {
          previousResultData!['getPublisher']['news']['items'] = [
            ...previousResultData!['getPublisher']['news']['items'] as List<dynamic>,
            ...fetchMoreResultData!['getPublisher']['news']['items'] as List<dynamic>
          ];
          return previousResultData;
        },
      );
      isLoading.value = true;
      queryResult.fetchMore(opts);
    }
  }, [isLoading, hasMore, nextToken]);
  // if (queryResult.result.isLoading) {
  //   isLoading.value = true;
  // } else {
    final data = queryResult.result.parsedData;
    safePrint('fetch isLoading ${isLoading.value}');
    var newsData = getNewsItemsFromQueryResult(data);
    print(news.value.length);
    print(newsData?.length);
    if (isLoading.value == true &&
        newsData != null &&
        newsData.isNotEmpty) {
      safePrint('fetch newsData ${newsData.length}');
      news.value = news.value.rebuild((b) => b..addAll(getNewsFromFragments(newsData)));
      nextToken.value = getNextTokenFromQueryResult(data);
      if (nextToken.value == null || news.value.isEmpty) {
        safePrint('nexttoken null');
        hasMore.value = false;
      }
      isLoading.value = false;
      safePrint('news length ${news.value.length}');
    } else if (isLoading.value == true && newsData != null) {
      safePrint('fetch newsData empty');
      isLoading.value = false;
      hasMore.value = false;
    } else {
      print('something wrong');
      print(isLoading.value);
      print(newsData?.length);
      print(news.value.length);
    }
  // }
  return UseNewsFeedQueryHookData(
    isLoading: isLoading.value,
    hasMore: hasMore.value,
    news: news.value.toList(),
    onFetchMore: onFetchMore,
  );
}

List<NewsItemModel> getNewsFromFragments(List<dynamic?> newsItems) {
  return newsItems
      .map((item) {
        if (item?.type == SourceType.RSS) {
          return NewsItemModelArticle.fromFragment(item!);
        } else if (item?.type == SourceType.YOUTUBE) {
          return NewsItemModelVideo.fromFragment(item!);
        } else if (item?.type == SourceType.ITUNES) {
          return NewsItemModelAudio.fromFragment(item!);
        } else {
          return null;
        }
      })
      .where((element) => element != null)
      .map((e) => e!)
      .toList();
}
