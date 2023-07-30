import 'package:flutter/animation.dart';

class PodcastPlayerScreenAnimationParams {
  final Size size;
  final double statusBarHeight;
  final double bottomBarHeight;

  PodcastPlayerScreenAnimationParams({
    required this.size,
    required this.statusBarHeight,
    required this.bottomBarHeight,
  });
}

const audioContainerHeight = 60.0;
const audioContainerWidth = audioContainerHeight;
const double audioContainerMargin = 5;
double getAudioImageHeight(width) => width;

class PodcastPlayerScreenAnimationMixinFields {
  final Animation<double> audioInfoOpacityAnimation;
  final Animation<double> audioContainerBottomAnimation;
  final Animation<double> audioContainerLeftAnimation;
  final Animation<double> audioContainerWidthAnimation;
  final Animation<double> audioPlayerButtonsOpacityAnimation;
  final Animation<double> audioImageWidthAnimation;
  final Animation<double> audioImageHeightAnimation;
  final Animation<double> screenHeightAnimation;

  final AnimationController animationController;
  final AnimationStatusListener animationStatusListener;

  PodcastPlayerScreenAnimationMixinFields._(
      {required this.animationController,
      required this.animationStatusListener,
      required this.audioInfoOpacityAnimation,
      required this.audioContainerBottomAnimation,
      required this.audioContainerLeftAnimation,
      required this.audioContainerWidthAnimation,
      required this.audioPlayerButtonsOpacityAnimation,
      required this.audioImageWidthAnimation,
      required this.audioImageHeightAnimation,
      required this.screenHeightAnimation});

  factory PodcastPlayerScreenAnimationMixinFields(AnimationController animationController,
      PodcastPlayerScreenAnimationParams screenParams) {
    final audioImageWidth = screenParams.size.width;
    final audioImageHeight = getAudioImageHeight(audioImageWidth);
    double audioContainerMarginBottom = screenParams.bottomBarHeight + 25;

    final playerButtonsOpacityTween = Tween<double>(begin: 1, end: 0);
    final audioInfoOpacityTween = Tween<double>(begin: 0, end: 1);
    final screenHeightTween = Tween<double>(
        begin: audioContainerHeight,
        end: screenParams.size.height -
            screenParams.statusBarHeight); // statusBarHeight
    final audioImageWidthTween =
        Tween<double>(begin: audioContainerWidth, end: screenParams.size.width);
    final audioImageHeightTween =
        Tween<double>(begin: audioContainerHeight, end: audioImageHeight);
    final audioContainerBottomTween =
        Tween<double>(begin: audioContainerMarginBottom, end: 0);
    final audioContainerLeftTween =
        Tween<double>(begin: audioContainerMargin, end: 0);
    final audioContainerWidthTween = Tween<double>(
        begin: screenParams.size.width - audioContainerMargin * 2, end: screenParams.size.width);

    final animation =
        CurvedAnimation(parent: animationController, curve: Curves.easeInOut);
    final audioInfoOpacityAnimation = audioInfoOpacityTween.animate(animation);
    final audioContainerBottomAnimation =
        audioContainerBottomTween.animate(animation);
    final audioContainerLeftAnimation =
        audioContainerLeftTween.animate(animation);
    final audioContainerWidthAnimation =
        audioContainerWidthTween.animate(animation);
    final audioPlayerButtonsOpacityAnimation =
        playerButtonsOpacityTween.animate(animation);
    final audioImageWidthAnimation = audioImageWidthTween.animate(animation);
    final audioImageHeightAnimation = audioImageHeightTween.animate(animation);
    final screenHeightAnimation = screenHeightTween.animate(animation);

    animationStatusListener(status) {
      if (status == AnimationStatus.completed) {
        animationController.reverse();
      } else if (status == AnimationStatus.dismissed) {
        animationController.forward();
      }
    }

    return PodcastPlayerScreenAnimationMixinFields._(
        animationController: animationController,
        animationStatusListener: animationStatusListener,
        audioInfoOpacityAnimation: audioInfoOpacityAnimation,
        audioContainerBottomAnimation: audioContainerBottomAnimation,
        audioContainerLeftAnimation: audioContainerLeftAnimation,
        audioContainerWidthAnimation: audioContainerWidthAnimation,
        audioPlayerButtonsOpacityAnimation: audioPlayerButtonsOpacityAnimation,
        audioImageWidthAnimation: audioImageWidthAnimation,
        audioImageHeightAnimation: audioImageHeightAnimation,
        screenHeightAnimation: screenHeightAnimation);
  }
}

// https://medium.com/@s.nazdrajic/flutter-hooks-through-animation-example-336cb4fe92e1
