import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:chewie/chewie.dart';
import 'package:transparent_image/transparent_image.dart';
import 'package:video_player/video_player.dart';
import 'package:youtube_explode_dart/youtube_explode_dart.dart';

final youtubePlayerKey = new GlobalKey<_YouTubeVideoPlayerState>();

ChewieController createChewieController(VideoPlayerController controller, {required bool showControls}) {
  return ChewieController(
    videoPlayerController: controller,
    aspectRatio: 16 / 9,
    autoPlay: true,
    looping: false,
    showControls: showControls,
    // Try playing around with some of these other options:
    // materialProgressColors: ChewieProgressColors(
    //   playedColor: Colors.red,
    //   handleColor: Colors.blue,
    //   backgroundColor: Colors.grey,
    //   bufferedColor: Colors.lightGreen,
    // ),
    // placeholder: Container(
    //   color: Colors.grey,
    // ),
    // autoInitialize: true,
  );
}

class YouTubeVideoPlayer extends StatefulWidget {
  String videoId;
  String? coverUrl;
  double width;
  double height;
  bool hideControls;
  final Function(bool isPlaying) onPlayingStateChange;

  YouTubeVideoPlayer({Key? key, required this.videoId, this.coverUrl, required this.width, required this.height, required this.onPlayingStateChange, required this.hideControls}) : super(key: key);

  @override
  _YouTubeVideoPlayerState createState() => _YouTubeVideoPlayerState();
}

Future<String> _getVideoUrl(videoId) async {
  var yt = YoutubeExplode();
  VideoQuality quality =  VideoQuality.medium360;

  var manifest = await yt.videos.streamsClient.getManifest(videoId);

  Uri? videoUri;
  manifest.muxed.forEach((m) {
    if (quality == m.videoQuality) {
      videoUri = m.url;
    }
  });
  if (videoUri == null) {
    return manifest.muxed.last.url.toString();
  } else {
    return videoUri.toString();
  }
}

class _YouTubeVideoPlayerState extends State<YouTubeVideoPlayer> {
  VideoPlayerController? videoPlayerController;
  ChewieController? chewieController;
  VoidCallback? playerListener;

  var isVideoReady = false;
  var isVideoPlaying = false;
  var isVideoHover = false;

  @override
  void initState() {
    super.initState();
    _playVideo();
  }

  @override
  void dispose() async {
    await videoPlayerController?.dispose();
    chewieController?.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant YouTubeVideoPlayer oldWidget) {
    if (oldWidget.hideControls != widget.hideControls) {
      chewieController = createChewieController(videoPlayerController!, showControls: !widget.hideControls);
    }
    super.didUpdateWidget(oldWidget);
  }

  void _playVideo() async {
    print('Create video');

    var videoUrl = kIsWeb ? 'http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4': await _getVideoUrl(widget.videoId);
    print(videoUrl);

    if (videoPlayerController == null) {
      videoPlayerController = VideoPlayerController.network(videoUrl);
      chewieController = createChewieController(videoPlayerController!, showControls: !widget.hideControls);

      if (!chewieController!.videoPlayerController.value.isInitialized) {
        chewieController!.videoPlayerController
          ..setVolume(1.0)
          ..initialize().then((_) {
            print('video player initialized');
            setState(() {
              isVideoReady = true;
              isVideoPlaying = true;
            });
            widget.onPlayingStateChange(true);
          })
          ..addListener(() {
            if (isVideoPlaying !=
                chewieController!.videoPlayerController.value.isPlaying) {
              setState(() {
                isVideoPlaying =
                    chewieController!.videoPlayerController.value.isPlaying;
              });
              widget.onPlayingStateChange(isVideoPlaying);
            }
          })
          ..play();
      } else {
        print('controller initialized');
      }
    } else {
      if (chewieController!.videoPlayerController.value.isPlaying) {
        await chewieController!.videoPlayerController.pause();
      }
      setState(() {
        isVideoReady = false;
        isVideoPlaying = false;
        widget.onPlayingStateChange(false);
      });

      videoPlayerController = null;
      chewieController = null;


      await videoPlayerController?.dispose();
      chewieController?.dispose();

      _playVideo();
    }
  }

  void togglePlayerState() async {
    if (videoPlayerController != null) {
      if (chewieController!.videoPlayerController.value.isPlaying) {
        await chewieController!.videoPlayerController.pause();
        setState(() {
          isVideoPlaying = false;
          widget.onPlayingStateChange(false);
        });
      } else {
        await chewieController!.videoPlayerController.play();
        setState(() {
          isVideoPlaying = true;
          widget.onPlayingStateChange(true);
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    var cover = widget.coverUrl != null ? FadeInImage.memoryNetwork(
      height: widget.height,
      width: widget.width,
      placeholder: kTransparentImage,
      image: widget.coverUrl!,
      fit: BoxFit.cover,
    ) : Container();
  return isVideoReady &&
        videoPlayerController != null
        ? Chewie(controller: chewieController!)
        : cover;
  }
}