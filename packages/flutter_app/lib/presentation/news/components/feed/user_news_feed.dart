import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/common/mixins/open_news_item_page.mixin.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

class UserNewsFeed extends HookWidget with OpenNewsItemPageMixin {
  const UserNewsFeed({super.key, required this.queryResult});

  final QueryHookResult<UserNewsFeedQuery> queryResult;

  @override
  Widget build(BuildContext context) {
    var data = useNewsFeedQuery<UserNewsFeedQuery, String>(
        queryResult: queryResult,
        getNewsItemsFromQueryResult: (result) =>
            result?.myUser.news?.items,
        getNextTokenFromQueryResult: (result) {
          return result?.myUser.news?.nextToken;
        },
        calculateNextTokenQueryVariables: (nextToken) =>
            {'nextToken': nextToken});

    var showError = useCallback((String exception) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: Colors.red,
        content: Text(exception),
      ));
    }, [data.exception]);
    if (data.exception != null) {
      showError(data.exception!);
    }

    return NewsCardsList(
      isLoading: data.isLoading,
      hasMore: data.hasMore,
      items: data.news,
      onOpenArticle: ({required articleId, isVideoArticle}) {
        openArticle(context, articleId);
      },
      onOpenVideo: ({required videoId}) {
        openVideo(context, videoId);
      },
      onOpenPodcast: ({required podcastId}) {
        openAudioPlayer(context, podcastId);
      },
      onFetchMore: data.onFetchMore,
    );
  }
}
