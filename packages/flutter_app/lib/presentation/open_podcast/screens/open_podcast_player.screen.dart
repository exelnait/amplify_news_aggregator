import 'package:flutter/material.dart';
import 'package:flutter/animation.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:just_audio/just_audio.dart';

import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';

class OpenPodcastPlayerScreen extends HookWidget {
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
    var animationFields = useMemoized(() => PodcastPlayerScreenAnimationMixinFields(
        animationController,
        PodcastPlayerScreenAnimationParams(
            size: screenSize,
            statusBarHeight: statusBarHeight,
            bottomBarHeight: bottomBarHeight)));

    final state = useBlocBuilder(openPodcastPlayerCubit);

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
                        PodcastPlayerCover(
                            animationFields: animationFields,
                            newsItem: newsItem,
                            toggleMinimization: () {
                              toggleMinimization(animationController);
                            },
                            isMinimized: isMinimized.value),
                        PodcastPlayerMinimizedControls(
                          animationFields: animationFields,
                          newsItem: newsItem,
                          audioPlayer: audioPlayer.value,
                          onClose: () {
                            audioPlayer.value.stop();
                            openPodcastPlayerCubit.closePlayer();
                          },
                          onTap: () {
                            if (isMinimized.value) {
                              toggleMinimization(animationController);
                            }
                          }
                        ),
                        PodcastPlayerToolbar(
                            animationFields: animationFields,
                            toggleMinimization: () {
                              toggleMinimization(animationController);
                            }),
                        PodcastPlayerFullContent(
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




