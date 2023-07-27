import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';

class NewsCardsList extends HookWidget {
  bool hasMore;
  bool isLoading;
  final List<NewsItemModel> items;

  final Function({required String articleId, bool? isVideoArticle}) onOpenArticle;
  final Function({required String videoId}) onOpenVideo;
  final Function({required String podcastId}) onOpenPodcast;
  VoidCallback onFetchMore;

  NewsCardsList(
      {super.key,
      required this.hasMore,
      required this.isLoading,
      required this.items,
      required this.onOpenArticle,
      required this.onOpenVideo,
      required this.onOpenPodcast,
      required this.onFetchMore});

  @override
  Widget build(BuildContext context) {
    var scrollController = useScrollController();

    final onScrollDownComplete = useCallback(() {
      onFetchMore();
    }, []);

    useEffect(() {
      print('news scroll controller add listener');
      listener() {
        // nextPageTrigger will have a value equivalent to 80% of the list size.
        var nextPageTrigger = 0.8 * scrollController.position.maxScrollExtent;
        // _scrollController fetches the next paginated data when the current postion of the user on the screen has surpassed
        if (scrollController.position.pixels > nextPageTrigger) {
          onScrollDownComplete();
        }
      }

      scrollController.addListener(listener);
      return () => scrollController.removeListener(listener);
    }, [scrollController]);
    return Column(
            children: [
              Expanded(
                child: ListView.builder(
                    controller: scrollController,
                    itemCount: items.length,
                    itemBuilder: (BuildContext context, int index) {
                      var newsItem = items[index];;
                      return CategoryFeedItem(block: newsItem.post, onOpenArticle: onOpenArticle, onOpenVideo: onOpenVideo, onOpenPodcast: onOpenPodcast,);
                    }),
              ),
              // if (isLoading)
              //   const Padding(
              //     padding: EdgeInsets.only(top: 10, bottom: 40),
              //     child: Center(
              //       child: CircularProgressIndicator(),
              //     ),
              //   ),

              // When nothing else to load
              if (!hasMore)
                Container(
                  padding: const EdgeInsets.only(top: 30, bottom: 40),
                  color: Colors.amber,
                  child: const Center(
                    child: Text('You have fetched all of the content'),
                  ),
                ),
            ],
          );
  }
}
