import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';

import 'package:news_aggregator/modules/newsstand/newsstand.module.dart';
import 'package:news_aggregator/modules/news/news.module.dart';

class NewsStandLocation extends BeamLocation<BeamState> {
  NewsStandLocation();

  @override
  List<Pattern> get pathPatterns => ['/newsstand', ...OpenNewsItemLocation().pathPatterns];

  @override
  List<BeamPage> buildPages(BuildContext context, BeamState state) {
    final pages = [
      const BeamPage(
        key: ValueKey('NewsstandScreen'),
        child: NewsStandScreen(),
      ),
      ...OpenNewsItemLocation().buildPages(context, state)
    ];
    return pages;
  }
}
