import 'package:flutter/animation.dart';

class AnimationScreenParams {
  final Size size;
  final double statusBarHeight;
  final double bottomBarHeight;

  AnimationScreenParams({
    required this.size,
    required this.statusBarHeight,
    required this.bottomBarHeight,
  });
}

const videoContainerHeight = 60.0;
const videoContainerWidth = videoContainerHeight * (16 / 9);
const double videoContainerMargin = 5;
double getVideoImageHeight(width) => width / (16 / 9);

class AnimationMixinFields {
  final Animation<double> videoInfoOpacityAnimation;
  final Animation<double> videoContainerBottomAnimation;
  final Animation<double> videoContainerLeftAnimation;
  final Animation<double> videoContainerWidthAnimation;
  final Animation<double> videoPlayerButtonsOpacityAnimation;
  final Animation<double> videoImageWidthAnimation;
  final Animation<double> videoImageHeightAnimation;
  final Animation<double> screenHeightAnimation;

  final AnimationController animationController;
  final AnimationStatusListener animationStatusListener;

  AnimationMixinFields._(
      {required this.animationController,
      required this.animationStatusListener,
      required this.videoInfoOpacityAnimation,
      required this.videoContainerBottomAnimation,
      required this.videoContainerLeftAnimation,
      required this.videoContainerWidthAnimation,
      required this.videoPlayerButtonsOpacityAnimation,
      required this.videoImageWidthAnimation,
      required this.videoImageHeightAnimation,
      required this.screenHeightAnimation});

  factory AnimationMixinFields(AnimationController animationController,
      AnimationScreenParams screenParams) {
    final videoImageWidth = screenParams.size.width;
    final videoImageHeight = getVideoImageHeight(videoImageWidth);
    double videoContainerMarginBottom = screenParams.bottomBarHeight + 5;

    final playerButtonsOpacityTween = Tween<double>(begin: 1, end: 0);
    final videoInfoOpacityTween = Tween<double>(begin: 0, end: 1);
    final screenHeightTween = Tween<double>(
        begin: videoContainerHeight,
        end: screenParams.size.height -
            screenParams.statusBarHeight); // statusBarHeight
    final videoImageWidthTween =
        Tween<double>(begin: videoContainerWidth, end: screenParams.size.width);
    final videoImageHeightTween =
        Tween<double>(begin: videoContainerHeight, end: videoImageHeight);
    final videoContainerBottomTween =
        Tween<double>(begin: videoContainerMarginBottom, end: 0);
    final videoContainerLeftTween =
        Tween<double>(begin: videoContainerMargin, end: 0);
    final videoContainerWidthTween = Tween<double>(
        begin: screenParams.size.width - videoContainerMargin * 2, end: screenParams.size.width);

    final animation =
        CurvedAnimation(parent: animationController, curve: Curves.easeInOut);
    final videoInfoOpacityAnimation = videoInfoOpacityTween.animate(animation);
    final videoContainerBottomAnimation =
        videoContainerBottomTween.animate(animation);
    final videoContainerLeftAnimation =
        videoContainerLeftTween.animate(animation);
    final videoContainerWidthAnimation =
        videoContainerWidthTween.animate(animation);
    final videoPlayerButtonsOpacityAnimation =
        playerButtonsOpacityTween.animate(animation);
    final videoImageWidthAnimation = videoImageWidthTween.animate(animation);
    final videoImageHeightAnimation = videoImageHeightTween.animate(animation);
    final screenHeightAnimation = screenHeightTween.animate(animation);

    animationStatusListener(status) {
      if (status == AnimationStatus.completed) {
        animationController.reverse();
      } else if (status == AnimationStatus.dismissed) {
        animationController.forward();
      }
    }

    return AnimationMixinFields._(
        animationController: animationController,
        animationStatusListener: animationStatusListener,
        videoInfoOpacityAnimation: videoInfoOpacityAnimation,
        videoContainerBottomAnimation: videoContainerBottomAnimation,
        videoContainerLeftAnimation: videoContainerLeftAnimation,
        videoContainerWidthAnimation: videoContainerWidthAnimation,
        videoPlayerButtonsOpacityAnimation: videoPlayerButtonsOpacityAnimation,
        videoImageWidthAnimation: videoImageWidthAnimation,
        videoImageHeightAnimation: videoImageHeightAnimation,
        screenHeightAnimation: screenHeightAnimation);
  }
}

// https://medium.com/@s.nazdrajic/flutter-hooks-through-animation-example-336cb4fe92e1
