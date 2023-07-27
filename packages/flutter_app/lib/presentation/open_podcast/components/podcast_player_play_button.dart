import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

class PodcastPlayerPlayButton extends StatelessWidget {
  const PodcastPlayerPlayButton({
    Key? key,
    required this.audioPlayer
  }) : super(key: key);

  final AudioPlayer audioPlayer;

  @override
  Widget build(BuildContext context) {

    return StreamBuilder<PlayerState>(
        stream: audioPlayer.playerStateStream,
        builder: (context, snapshot) {
          final playerState = snapshot.data;
          final processingState = playerState!.processingState;
          if (processingState == ProcessingState.loading ||
              processingState == ProcessingState.buffering) {
            return Container(
              margin: const EdgeInsets.all(8.0),
              child: const CircularProgressIndicator(color: Colors.white),
            );
          } else if (playerState.playing != true) {
            return IconButton(
              icon: const Icon(Icons.play_arrow, color: Colors.white,),
              onPressed: audioPlayer.play,
            );
          } else if (processingState != ProcessingState.completed) {
            return IconButton(
              icon: const Icon(Icons.pause, color: Colors.white,),
              onPressed: audioPlayer.pause,
            );
          } else {
            return IconButton(
              icon: const Icon(Icons.replay, color: Colors.white,),
              onPressed: () => audioPlayer.seek(Duration.zero,
                  index: audioPlayer.effectiveIndices!.first),
            );
          }
        }
    );
  }
}