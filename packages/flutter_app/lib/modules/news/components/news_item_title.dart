import 'package:flutter/material.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

class NewsItemTitle extends StatelessWidget {
  const NewsItemTitle({
    Key? key,
    required this.content,
    this.isOverflow = false,
  }) : super(key: key);

  final String content;
  final bool isOverflow;

  @override
  Widget build(BuildContext context) {
    return Hero(
          tag: "${content}_title",
          child: Material(
              color: Colors.transparent,
              child: Text(
                content,
                textAlign: TextAlign.start,
                overflow: isOverflow ? TextOverflow.ellipsis : TextOverflow.visible,
                maxLines: isOverflow ? 2 : 5,
                // softWrap: false,
                style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600),
              )),
    );
  }
}