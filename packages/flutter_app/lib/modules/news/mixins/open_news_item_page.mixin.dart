import 'package:flutter/widgets.dart';
import 'package:beamer/beamer.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

mixin OpenNewsItemPageMixin {
  void openArticle(BuildContext context, String itemId) {
    context.beamToNamed(
        '/open/rss/$itemId', beamBackOnPop: true);
  }
  void openVideo(BuildContext context, String itemId) {
    context.beamToNamed(
        '/open/youtube/$itemId');
  }

  void openAudioPlayer(BuildContext context, String itemId) {
    openAudioPlayerCubit.openPlayer(itemId);
  }
}