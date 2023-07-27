import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';

mixin OpenNewsItemPageMixin {
  void openArticle(BuildContext context, String source, String itemId) {
    context.go(
        '$source/open/rss/$itemId');
  }
  void openVideo(BuildContext context, String source, String itemId) {
    context.go(
        '$source/open/youtube/$itemId');
  }

  void openAudioPlayer(BuildContext context, String itemId) {
    openPodcastPlayerCubit.openPlayer(itemId);
  }
}