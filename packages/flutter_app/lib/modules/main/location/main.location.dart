import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'package:news_aggregator/modules/home_feed/home_feed.module.dart';
import 'package:news_aggregator/modules/news/news.module.dart';

import '../screens/main.screen.dart';

class MainLocation extends BeamLocation<BeamState> {
  @override
  List<Pattern> get pathPatterns => [
        '/feed',
        ...PublisherLocation().pathPatterns,
       ...OpenNewsItemLocation().pathPatterns
      ];

  @override
  List<BeamPage> buildPages(BuildContext context, BeamState state) {
    final pages = [
      const BeamPage(
        key: ValueKey('HomeScreen'),
        child: MainScreen()
      ),
      ...PublisherLocation().buildPages(context, state),
      ...OpenNewsItemLocation().buildPages(context, state)
    ];
    return pages;
  }

  @override
  List<BeamGuard> get guards => [];
}