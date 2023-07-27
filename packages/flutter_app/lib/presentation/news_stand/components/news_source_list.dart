import 'package:flutter/material.dart';

import 'package:news_aggregator/data/publisher/publisher.data.dart';
import 'package:news_aggregator/presentation/news_stand/news_stand.presentation.dart';

class NewsSourceList extends StatelessWidget {
  final String title;
  final List<PublisherModel> data;
  final Function onAdd;

  final Function(PublisherModel newsSource) onTap;

  NewsSourceList(
      {required this.title,
      required this.data,
      required this.onAdd,
      required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      NewsSourceListHeader(title: title, onAdd: onAdd),
      Container(
          padding: const EdgeInsets.only(top: 10, bottom: 10),
          height: 180,
          child: ListView(
            padding: const EdgeInsets.only(left: 2, right: 2),
            scrollDirection: Axis.horizontal,
            children: data
                .map((newsSource) => NewsSourceListItem(
                    newsSource: newsSource,
                    onTap: onTap))
                .toList(),
          ))
    ]);
  }
}
