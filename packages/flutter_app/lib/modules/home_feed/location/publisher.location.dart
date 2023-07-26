import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';

import 'package:news_aggregator/modules/home_feed/home_feed.module.dart';

class PublisherLocation extends BeamLocation<BeamState> {

  @override
  List<String> get pathPatterns => ['/publisher/:publisherId'];

  @override
  List<BeamPage> buildPages(BuildContext context, BeamState state) {
    var publisherId = state.pathParameters['publisherId'];
    return [
      if (publisherId != null)
        BeamPage(
          key: const ValueKey('PublisherScreen'),
          title: 'PublisherScreen',
          child: PublisherScreen(publisherId: publisherId),
        ),
    ];
  }
}

