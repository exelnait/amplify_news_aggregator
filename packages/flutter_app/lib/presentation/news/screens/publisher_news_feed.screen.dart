import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/data/publisher/publisher.data.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

class PublisherNewsFeedScreen extends HookWidget {
  const PublisherNewsFeedScreen({super.key, required this.publisherId});

  final String publisherId;

  @override
  Widget build(BuildContext context) {
    useAutomaticKeepAlive();
    var isLoading = useState(true);

    final queryResult = useQueryGetPublisherWithNewsFeed(
        PublisherWithNewsFeedQueryOptions(
            variables:
                PublisherWithNewsFeedQueryVariables(publisherID: publisherId), onComplete: (data, query) {
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
    final data = queryResult.result.parsedData;
    if (data == null) {
      return const Center(child: Text("No publisher"));
    }
    var publisher =
        PublisherModel.fromFragment(data.getPublisher as PublisherInfoFragment);
    var sources = data.getPublisher?.sources?.items
            .where(
                (source) => ['RSS', 'YOUTUBE', 'ITUNES'].contains(source?.type))
            .toList() ??
        [];

    var tabController = useTabController(initialLength: sources.length + 1);

    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            CategoriesTabBar(
              controller: tabController,
              tabs: [
                const CategoryTab(
                  categoryName: 'All',
                ),
                ...sources.map((source) => CategoryTab(
                  categoryName: source!.title ?? source.type,
                  onDoubleTap: () {},
                ))
              ],
            ),
            Expanded(
              child: TabBarView(
                controller: tabController,
                children: [
                  PublisherGeneralNewsFeed(queryResult: queryResult),
                  ...sources.map((source) => PublisherNewsFeedByType(
                      publisherId: publisherId, type: source!.type)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// https://github.com/tensor-programming/flutter_scroll_tab_tutorial/blob/master/lib/main.dart
