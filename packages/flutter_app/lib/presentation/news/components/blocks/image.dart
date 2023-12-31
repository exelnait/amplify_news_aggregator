import 'package:flutter/material.dart' hide ProgressIndicator;

import 'package:news_aggregator/ui/app_ui.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

/// {@template image}
/// A reusable image news block widget.
/// {@endtemplate}
class Image extends StatelessWidget {
  /// {@macro image}
  const Image({super.key, required this.block});

  /// The associated [ImageBlock] instance.
  final ImageBlock block;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      child: InlineImage(
        imageUrl: block.imageUrl,
        progressIndicatorBuilder: (context, url, downloadProgress) =>
            ProgressIndicator(progress: downloadProgress.progress),
      ),
    );
  }
}
