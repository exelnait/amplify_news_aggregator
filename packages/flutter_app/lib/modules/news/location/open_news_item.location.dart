import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

class OpenNewsItemLocation extends BeamLocation<BeamState> {
  @override
  List<Pattern> get pathPatterns => [
        '/open/:newsItemType/:newsItemId',
      ];

  @override
  List<BeamPage> buildPages(BuildContext context, BeamState state) {
    final newsItemId = state.pathParameters['newsItemId'];
    final newsItemType = state.pathParameters['newsItemType'];
    final pages = [
      if (newsItemId != null && newsItemType != null)
        BeamPage(
          key: ValueKey('OpenNewsItem-$newsItemType-$newsItemId'),
          child: newsItemType == 'rss'
              ? OpenArticleScreen(id: newsItemId, isVideoArticle: false)
              : OpenVideoScreen(videoId: newsItemId)
        ),
    ];
    return pages;
  }

  @override
  List<BeamGuard> get guards => [];
}
