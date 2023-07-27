import 'package:flutter/material.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/ui/app_ui.dart';

/// {@template text_headline}
/// A reusable text headline news block widget.
/// {@endtemplate}
class TextHeadline extends StatelessWidget {
  /// {@macro text_headline}
  const TextHeadline({super.key, required this.block});

  /// The associated [TextHeadlineBlock] instance.
  final TextHeadlineBlock block;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      child: Text(
        block.text,
        style: Theme.of(context).textTheme.displayMedium,
      ),
    );
  }
}
