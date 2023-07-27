
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';

class PodcastPlayerButtons extends StatelessWidget {
  const PodcastPlayerButtons({
    Key? key,
    required this.audioPlayer,
  }) : super(key: key);

  final AudioPlayer audioPlayer;

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<Duration?>(
        stream: audioPlayer.positionStream,
        builder: (context, snapshot) {
          var duration = snapshot.data ?? Duration.zero;
          return Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(onPressed: () {
                audioPlayer.seek(Duration(seconds: duration.inSeconds - 30));
              }, icon: const Icon(Icons.skip_previous_outlined, color: Colors.white)),
              PodcastPlayerPlayButton(
                  audioPlayer: audioPlayer
              ),
              IconButton(onPressed: () {
                audioPlayer.seek(Duration(seconds: duration.inSeconds + 30));
              }, icon: const Icon(Icons.skip_next_outlined, color: Colors.white)),
            ],
          );
        }
    );
  }
}