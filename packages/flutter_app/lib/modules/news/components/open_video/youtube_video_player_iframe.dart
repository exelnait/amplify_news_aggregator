import 'package:flutter/widgets.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class YouTubeVideoPlayer extends StatefulWidget {
  final String videoId;
  final Widget cover;

  const YouTubeVideoPlayer({super.key, required this.videoId, required this.cover});

  @override
  _YouTubeVideoPlayerState createState() => _YouTubeVideoPlayerState();
}

class _YouTubeVideoPlayerState extends State<YouTubeVideoPlayer> {

  bool isPlayerReady = false;
  YoutubePlayerController? controller;

  @override
  void initState() {
    controller = YoutubePlayerController(
      initialVideoId: widget.videoId,
      flags: const YoutubePlayerFlags(
        autoPlay: true,
        mute: true,
      ),
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Stack(
        children: [
          if (controller != null)
            YoutubePlayer(
              controller: controller!,
              aspectRatio: 16 / 9,
              onReady: () {
                setState(() {
                  isPlayerReady = true;
                });
              },
            ),
          if (!isPlayerReady) widget.cover,
        ],
      ),
    );
  }
}