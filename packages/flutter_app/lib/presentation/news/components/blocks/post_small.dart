import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/ui/app_ui.dart';


/// {@template post_small}
/// A reusable post small news block widget.
/// {@endtemplate}
class PostSmall extends StatelessWidget {
  /// {@macro post_small}
  const PostSmall({super.key, required this.block, this.onPressed});

  /// The size of this post image.
  static const _imageSize = 80.0;

  /// The associated [PostSmallBlock] instance.
  final PostSmallBlock block;

  /// An optional callback which is invoked when the action is triggered.
  /// A [Uri] from the associated [BlockAction] is provided to the callback.
  final BlockActionCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final imageUrl = block.imageUrl;

    return GestureDetector(
      onTap: () {
        if (block.hasNavigationAction) onPressed?.call(block.action!);
      },
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (imageUrl != null)
              Padding(
                padding: const EdgeInsets.only(right: AppSpacing.lg),
                child: CachedNetworkImage(
                  imageUrl: imageUrl,
                  width: _imageSize,
                  height: _imageSize,
                  fit: BoxFit.cover,
                ),
              ),
            Flexible(
              child: PostSmallContent(
                title: block.title,
                publishedAt: block.publishedAt,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// {@template post_small_content}
/// The content of [PostSmall].
/// {@endtemplate}
@visibleForTesting
class PostSmallContent extends StatelessWidget {
  /// {@macro post_small_content}
  const PostSmallContent({
    super.key,
    required this.title,
    required this.publishedAt,
  });

  /// The title of this post.
  final String title;

  /// The date when this post was published.
  final DateTime publishedAt;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: textTheme.titleLarge?.copyWith(
            color: AppColors.highEmphasisSurface,
          ),
        ),
        const SizedBox(height: AppSpacing.xs),
        PostFooter(
          publishedAt: publishedAt,
        ),
      ],
    );
  }
}
