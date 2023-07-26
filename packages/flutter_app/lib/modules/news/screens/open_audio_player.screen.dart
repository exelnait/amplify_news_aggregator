import 'package:flutter/material.dart';
import 'package:flutter/animation.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_swipe_detector/flutter_swipe_detector.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:just_audio/just_audio.dart';
import 'package:multiple_stream_builder/multiple_stream_builder.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

import '../components/open_audio/audio_player_animation.dart';

class OpenAudioPlayerScreen extends HookWidget {
  @override
  Widget build(BuildContext context) {
    print('init player');

    var screenSize = MediaQuery.of(context).size;
    var statusBarHeight = MediaQuery.of(context).padding.top;
    var bottomBarHeight = MediaQuery.of(context).padding.bottom + 60;

    var isMinimized = useState(true);
    var isPlaying = useState(false);
    var audioPlayer = useState(AudioPlayer());

    var toggleMinimization = useCallback((animationController) {
      try {
        isMinimized.value = !isMinimized.value;
        if (isMinimized.value) {
          animationController.reverse().orCancel;
        } else {
          animationController.forward().orCancel;
        }
      } on TickerCanceled {
        print('the animation got canceled, probably because we were disposed');
      }
    }, [isMinimized]);

    final animationController =
        useAnimationController(duration: const Duration(milliseconds: 500));
    var animationFields = useMemoized(() => AnimationMixinFields(
        animationController,
        AnimationScreenParams(
            size: screenSize,
            statusBarHeight: statusBarHeight,
            bottomBarHeight: bottomBarHeight)));

    final state = useBlocBuilder(openAudioPlayerCubit);

    print('state: $state');

    useEffect(() {
      if (state.audio != null) {
        print('init player');
        audioPlayer.value.setUrl(state.audio!.url.toString());
      }
    }, [state.audio]);

    if (state.audio != null) {
      var newsItem = state.audio!;
      return AnimatedBuilder(
        builder: (BuildContext context, Widget? w) {
          return Positioned(
              bottom: animationFields.audioContainerBottomAnimation.value,
              left: animationFields.audioContainerLeftAnimation.value,
              height: animationFields.screenHeightAnimation.value,
              child: Material(
                  color: Colors.grey[900],
                  child: Container(
                      width: animationFields.audioContainerWidthAnimation.value,
                      child: Stack(children: <Widget>[
                        _OpenAudioPlayerCover(
                            animationFields: animationFields,
                            newsItem: newsItem,
                            toggleMinimization: () {
                              toggleMinimization(animationController);
                            },
                            isMinimized: isMinimized.value),
                        _OpenAudioPlayerMinimizedControls(
                          animationFields: animationFields,
                          newsItem: newsItem,
                          audioPlayer: audioPlayer.value,
                          onClose: () {
                            audioPlayer.value.stop();
                            openAudioPlayerCubit.closePlayer();
                          },
                          onTap: () {
                            if (isMinimized.value) {
                              toggleMinimization(animationController);
                            }
                          }
                        ),
                        _OpenAudioPlayerToolbar(
                            animationFields: animationFields,
                            toggleMinimization: () {
                              toggleMinimization(animationController);
                            }),
                        _OpenAudioPlayerFullContent(
                            animationFields: animationFields,
                            newsItem: newsItem, audioPlayer: audioPlayer.value,),
                      ]))));
        },
        animation: animationController.view,
      );
    } else {
      return const SizedBox();
    }
  }
}

class _OpenAudioPlayerToolbar extends StatelessWidget {
  const _OpenAudioPlayerToolbar({
    Key? key,
    required this.animationFields,
    required this.toggleMinimization,
  }) : super(key: key);

  final AnimationMixinFields animationFields;
  final Function() toggleMinimization;

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: animationFields.audioInfoOpacityAnimation.value,
      child: ButtonBar(
        alignment: MainAxisAlignment.center,
        children: [
          IconButton(
              onPressed: toggleMinimization,
              icon: const Icon(
                Icons.keyboard_arrow_down,
                color: Colors.white,
              )),
        ],
      ),
    );
  }
}

class _OpenAudioPlayerCover extends StatelessWidget {
  const _OpenAudioPlayerCover({
    Key? key,
    required this.animationFields,
    required this.newsItem,
    required this.toggleMinimization,
    required this.isMinimized,
  }) : super(key: key);

  final AnimationMixinFields animationFields;
  final NewsItemModelAudio newsItem;

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

class _OpenAudioPlayerMinimizedControls extends StatelessWidget {
  const _OpenAudioPlayerMinimizedControls({
    Key? key,
    required this.animationFields,
    required this.newsItem,
    required this.onClose,
    required this.onTap,
    required this.audioPlayer,
  }) : super(key: key);

  final AnimationMixinFields animationFields;
  final NewsItemModelAudio newsItem;
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
                            AudioPlayerPlayButton(audioPlayer: audioPlayer),
                            IconButton(
                                onPressed: onClose,
                                icon: const Icon(Icons.close,
                                    color: Colors.white))
                          ]))),
            )));
  }
}

class AudioPlayerPlayButton extends StatelessWidget {
  const AudioPlayerPlayButton({
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

class _OpenAudioPlayerFullContent extends StatelessWidget {
  const _OpenAudioPlayerFullContent({
    Key? key,
    required this.animationFields,
    required this.newsItem,
    required this.audioPlayer,
  }) : super(key: key);

  final AnimationMixinFields animationFields;
  final NewsItemModelAudio newsItem;
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
                AudioPlayerDurationSlider(audioPlayer: audioPlayer),
                const SizedBox(
                  height: 15,
                ),
                AudioPlayerButtons(audioPlayer: audioPlayer),
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

class AudioPlayerButtons extends StatelessWidget {
  const AudioPlayerButtons({
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
            AudioPlayerPlayButton(
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

class AudioPlayerDurationSlider extends StatelessWidget {
  const AudioPlayerDurationSlider({
    Key? key,
    required this.audioPlayer,
  }) : super(key: key);

  final AudioPlayer audioPlayer;

  @override
  Widget build(BuildContext context) {
    return StreamBuilder2<Duration?, Duration?>(
        streams: StreamTuple2(audioPlayer.positionStream, audioPlayer.durationStream),
        builder: (context, snapshots) {
          var position = snapshots.snapshot1.data ?? Duration.zero;
          var duration = snapshots.snapshot2.data ?? Duration.zero;
          var durationRemaining = Duration(seconds: duration.inSeconds - position.inSeconds);
          String sPosition = "${position.inHours > 0 ? "${position.inHours}:": ""}${position.inMinutes.remainder(60)}:${(position.inSeconds.remainder(60))}";
          String sDurationRemaining = "${durationRemaining.inHours > 0 ? "${durationRemaining.inHours}:": ""}${durationRemaining.inMinutes.remainder(60)}:${(durationRemaining.inSeconds.remainder(60))}";
          return Column(
            children: [
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                    activeTrackColor: Colors.white,
                    inactiveTrackColor: Colors.white.withAlpha(30),
                    thumbColor: Colors.white,
                    trackHeight: 4,
                    trackShape: CustomTrackShape(),
                    overlayShape: SliderComponentShape.noOverlay),
                child: Slider(
                  value: position.inSeconds.toDouble(),
                  min: 0,
                  max: duration.inSeconds.toDouble(),
                  onChanged: (value) {
                    audioPlayer.seek(Duration(seconds: value.toInt()));
                  },
                ),
              ),
              const SizedBox(height: 5),
              Row(
                children: [
                  Text(sPosition,
                      style: const TextStyle(
                          color: Color(0xffc3bfb9),
                          fontWeight: FontWeight.w300,
                          fontStyle: FontStyle.normal,
                          fontSize: 13.0),
                      textAlign: TextAlign.left),
                  const Expanded(child: SizedBox()),
                  Text("-$sDurationRemaining",
                      style: const TextStyle(
                          color: Color(0xffc3bfb9),
                          fontWeight: FontWeight.w300,
                          fontStyle: FontStyle.normal,
                          fontSize: 13.0),
                      textAlign: TextAlign.left)
                ],
              )
            ],
          );
        }
    );
  }
}

class CustomTrackShape extends RoundedRectSliderTrackShape {
  @override
  Rect getPreferredRect({
    required RenderBox parentBox,
    Offset offset = Offset.zero,
    required SliderThemeData sliderTheme,
    bool isEnabled = false,
    bool isDiscrete = false,
  }) {
    final double? trackHeight = sliderTheme.trackHeight;
    final double trackLeft = offset.dx;
    final double trackTop =
        offset.dy + (parentBox.size.height - trackHeight!) / 2;
    final double trackWidth = parentBox.size.width;
    return Rect.fromLTWH(trackLeft, trackTop, trackWidth, trackHeight);
  }
}