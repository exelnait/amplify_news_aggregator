import 'package:flutter/material.dart';
import 'package:flutter_swipe_detector/flutter_swipe_detector.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';

class PodcastPlayerCover extends StatelessWidget {
  const PodcastPlayerCover({
    Key? key,
    required this.animationFields,
    required this.newsItem,
    required this.toggleMinimization,
    required this.isMinimized,
  }) : super(key: key);

  final PodcastPlayerScreenAnimationMixinFields animationFields;
  final NewsItemModelPodcast newsItem;

  final Function toggleMinimization;

  final bool isMinimized;

  @override
  Widget build(BuildContext context) {
    return Positioned(
        width: animationFields.audioImageWidthAnimation.value,
        height: animationFields.audioImageHeightAnimation.value,
        top: 0,
        left: 0,
        child: SwipeDetector(
            onSwipeDown: (offset) {
              toggleMinimization();
            },
            child: Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                    image: NetworkImage(
                        newsItem.post.imageUrl!)
                ),
              ),
            )));
  }
}