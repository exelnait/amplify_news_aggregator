import 'package:flutter/material.dart';

import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';

class PodcastPlayerToolbar extends StatelessWidget {
  const PodcastPlayerToolbar({
    Key? key,
    required this.animationFields,
    required this.toggleMinimization,
  }) : super(key: key);

  final PodcastPlayerScreenAnimationMixinFields animationFields;
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