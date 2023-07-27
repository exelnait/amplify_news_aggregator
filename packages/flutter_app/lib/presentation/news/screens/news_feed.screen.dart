import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

class NewsFeedScreen extends HookWidget {
  const NewsFeedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    useAutomaticKeepAlive();
    var isLoading = useState(true);

    final queryResult = useQueryGetUserNewsFeed(
        UserNewsFeedQueryOptions(onComplete: (data, query) {
          isLoading.value = false;
        }));
    if (queryResult.result.hasException) {
      return Text(queryResult.result.exception.toString());
    }
    if (isLoading.value) {
      return const Scaffold(
          backgroundColor: Colors.white,
          body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Feed'),
      ),
      body: SafeArea(
        bottom: false,
        child: UserNewsFeed(queryResult: queryResult),
      ),
    );
  }
}

// https://github.com/tensor-programming/flutter_scroll_tab_tutorial/blob/master/lib/main.dart
