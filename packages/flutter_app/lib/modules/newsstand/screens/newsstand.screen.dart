import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'package:news_aggregator/modules/newsstand/newsstand.module.dart';
import 'package:news_aggregator/modules/home_feed/home_feed.module.dart';

class NewsStandScreen extends HookWidget {
  const NewsStandScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final queryResult = useQueryGetNewsStand(GetNewsStandOptions());
    if (queryResult.result.hasException) {
      return Text(queryResult.result.exception.toString());
    }
    if (queryResult.result.isLoading) {
      return Center(child: CircularProgressIndicator());
    }
    final data = queryResult.result.parsedData;

    return Scaffold(
        appBar: AppBar(
          title: const Text('News Stand'),
        ),
        body: Material(
          color: Colors.transparent,
          child: ListView(
            children: <Widget>[
              ...data?.listTopics?.items.map((topic) {
                    var publishers = topic?.publishers?.items
                            .map((p) => PublisherModel.fromFragment(p!))
                            .toList() ??
                        [];
                    return NewsSourceList(
                      title: topic!.title,
                      data: publishers,
                      onAdd: () {},
                      onTap: (PublisherModel newsSource) {
                        context.beamToNamed('/publisher/${newsSource.id}');
                      },
                    );
                  }) ??
                  []
            ],
          ),
        ));
  }
}
