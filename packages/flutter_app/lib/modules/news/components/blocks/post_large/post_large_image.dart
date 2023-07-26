import 'package:flutter/material.dart';

import 'package:news_aggregator/ui/app_ui.dart';
import 'package:news_aggregator/modules/news/components/blocks/blocks.dart';

/// {@template post_large_image}
/// Block post large image widget.
/// {@endtemplate}
class PostLargeImage extends StatelessWidget {
  /// {@macro post_large_image}
  const PostLargeImage({
    super.key,
    required this.imageUrl,
    required this.isContentOverlaid,
    required this.isLocked,
  });

  /// The url of image displayed in this post.
  final String imageUrl;

  /// Whether this image is displayed in overlay.
  final bool isContentOverlaid;

  /// Whether this image displays lock icon.
  final bool isLocked;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (isContentOverlaid)
          OverlaidImage(
            imageUrl: imageUrl,
            gradientColor: AppColors.black.withOpacity(0.7),
          )
        else
          InlineImage(imageUrl: imageUrl),
        if (isLocked) const LockIcon(),
      ],
    );
  }
}
