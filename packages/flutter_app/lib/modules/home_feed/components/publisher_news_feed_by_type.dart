import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'package:news_aggregator/modules/news/news.module.dart';
import 'package:news_aggregator/modules/home_feed/home_feed.module.dart';

class PublisherNewsFeedByType extends HookWidget with OpenNewsItemPageMixin {
  const PublisherNewsFeedByType({super.key, required this.publisherId, required this.type});

  final String publisherId;
  final String type;

  @override
  Widget build(BuildContext context) {
    var queryResult = useQueryGetPublisherNewsFeedByType(PublisherNewsFeedByTypeQueryOptions(
        variables: PublisherNewsFeedByTypeQueryVariables(publisherID: publisherId, type: type)));
    var data = useNewsFeedQuery<PublisherNewsFeedByTypeQuery, String>(
        queryResult: queryResult,
        getNewsItemsFromQueryResult: (result) =>
            result?.searchNewsItems?.items,
        getNextTokenFromQueryResult: (result) {
          return result?.searchNewsItems?.nextToken;
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
