import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/ui/app_ui.dart';

/// {@template text_paragraph}
/// A reusable text paragraph news block widget.
/// {@endtemplate}
class TextParagraph extends StatelessWidget {
  /// {@macro text_paragraph}
  const TextParagraph({super.key, required this.block, required this.onUrlTap});

  /// The associated [TextParagraphBlock] instance.
  final TextParagraphBlock block;
  final Function(String url) onUrlTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      child: Text.rich(
        TextSpan(
          children: block.children.map((child) {
            final recognizer = TapGestureRecognizer()
              ..onTap = () {
                onUrlTap(child.href!);
              };
            var style = Theme.of(context).textTheme.bodyLarge;
            if (child.href != null) {
              style = style!.copyWith(decoration: TextDecoration.underline, color: Colors.lightBlue[500]);
            }
            return TextSpan(
              text: child.content,
              recognizer: child.href != null ? recognizer : null,
              style: style,
            );
          }).toList(),
        ),
      ),
    );
  }
}
