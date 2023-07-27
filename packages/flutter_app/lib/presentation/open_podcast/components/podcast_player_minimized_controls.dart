import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';


class PodcastPlayerMinimizedControls extends StatelessWidget {
  const PodcastPlayerMinimizedControls({
    Key? key,
    required this.animationFields,
    required this.newsItem,
    required this.onClose,
    required this.onTap,
    required this.audioPlayer,
  }) : super(key: key);

  final PodcastPlayerScreenAnimationMixinFields animationFields;
  final NewsItemModelPodcast newsItem;
  final Function() onClose;
  final Function() onTap;
  final AudioPlayer audioPlayer;

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    return Positioned(
        right: 0,
        width:
        screenSize.width - audioContainerMargin * 2 - audioContainerWidth,
        height: audioContainerHeight,
        child: Opacity(
            opacity: animationFields.audioPlayerButtonsOpacityAnimation.value,
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                  enableFeedback: true,
                  onTap: onTap,
                  child: Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: <Widget>[
                            Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    RichText(
                                        textAlign: TextAlign.left,
                                        maxLines: 1,
                                        softWrap: true,
                                        text: TextSpan(
                                            text: newsItem.post.title,
                                            style: const TextStyle(
                                                color: Colors.white))),
                                    if (newsItem.post.author != null)
                                      Text(newsItem.post.author!,
                                          style: TextStyle(color: Colors.grey[400])),
                                  ],
                                )),
                            PodcastPlayerPlayButton(audioPlayer: audioPlayer),
                            IconButton(
                                onPressed: onClose,
                                icon: const Icon(Icons.close,
                                    color: Colors.white))
                          ]))),
            )));
  }
}