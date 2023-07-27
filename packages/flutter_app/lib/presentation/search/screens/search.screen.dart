import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:news_aggregator/presentation/news/models/news_item.model.dart';
import 'package:searchable_listview/searchable_listview.dart';

class SearchScreen extends HookWidget {
  const SearchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          child: Material(
            color: Colors.transparent,
            child: SearchableList<NewsItemModel>(
              initialList: [],
              builder: (NewsItemModel newsItem) => Text("test"),
              filter: (value) => [],
              emptyWidget:  Container(),
              inputDecoration: InputDecoration(
                fillColor: Colors.white
              ),
            ),
          ),
        ));
  }
}
