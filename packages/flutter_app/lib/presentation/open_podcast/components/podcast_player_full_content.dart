import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';

class PodcastPlayerFullContent extends StatelessWidget {
  const PodcastPlayerFullContent({
    Key? key,
    required this.animationFields,
    required this.newsItem,
    required this.audioPlayer,
  }) : super(key: key);

  final PodcastPlayerScreenAnimationMixinFields animationFields;
  final NewsItemModelPodcast newsItem;
  final AudioPlayer audioPlayer;

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    final videoImageWidth = screenSize.width;
    final videoImageHeight = getAudioImageHeight(videoImageWidth);
    return Positioned(
      width: videoImageWidth,
      top: videoImageHeight,
      child: Opacity(
        opacity: animationFields.audioInfoOpacityAnimation.value,
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              // title and like button
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // title
                  Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Text(newsItem.post.title,
                        style: const TextStyle(
                            color: Color(0xffffffff),
                            fontWeight: FontWeight.w700,
                            fontStyle: FontStyle.normal,
                            fontSize: 24.0),
                        textAlign: TextAlign.left),
                  ),
                  // Creator
                  if (newsItem.post.author != null)
                    Text(newsItem.post.author!,
                        style: const TextStyle(
                            color: Color(0xffbfb8b2),
                            fontWeight: FontWeight.w600,
                            fontStyle: FontStyle.normal,
                            fontSize: 16.0),
                        textAlign: TextAlign.left)
                ],
              ),
              const SizedBox(
                height: 15,
              ),
              // seek bar
              PodcastPlayerDurationSlider(audioPlayer: audioPlayer),
              const SizedBox(
                height: 15,
              ),
              PodcastPlayerButtons(audioPlayer: audioPlayer),
              const SizedBox(
                height: 25,
              ),
              //
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  // IconButtonWidget(icon: 'connect-device.png'),
                  Expanded(child: SizedBox()),
                  // IconButtonWidget(icon: 'playlist.png'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
