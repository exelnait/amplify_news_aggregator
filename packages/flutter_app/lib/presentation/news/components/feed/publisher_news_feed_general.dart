import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/common/mixins/open_news_item_page.mixin.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

class PublisherGeneralNewsFeed extends HookWidget with OpenNewsItemPageMixin {
  const PublisherGeneralNewsFeed({super.key, required this.publisherId, required this.queryResult});

  final String publisherId;

  final QueryHookResult<PublisherWithNewsFeedQuery> queryResult;

  @override
  Widget build(BuildContext context) {
    var data = useNewsFeedQuery<PublisherWithNewsFeedQuery, String>(
        queryResult: queryResult,
        getNewsItemsFromQueryResult: (result) =>
            result?.getPublisher?.news?.items,
        getNextTokenFromQueryResult: (result) {
          return result?.getPublisher?.news?.nextToken;
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
        openArticle(context, '/news_stand/publisher/$publisherId', articleId);
      },
      onOpenVideo: ({required videoId}) {
        openVideo(context, '/news_stand/publisher/$publisherId', videoId);
      },
      onOpenPodcast: ({required podcastId}) {
        openAudioPlayer(context, podcastId);
      },
      onFetchMore: data.onFetchMore,
    );
  }
}
