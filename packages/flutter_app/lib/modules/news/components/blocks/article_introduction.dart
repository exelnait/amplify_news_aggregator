import 'package:flutter/material.dart';
import 'package:news_aggregator/ui/app_ui.dart';
import 'package:news_aggregator/modules/news/news.module.dart';

/// {@template article_introduction}
/// A reusable article introduction block widget.
/// {@endtemplate}
class ArticleIntroduction extends StatelessWidget {
  /// {@macro article_introduction}
  const ArticleIntroduction({
    super.key,
    required this.block,
    this.premiumText,
  });

  /// The associated [ArticleIntroductionBlock] instance.
  final ArticleIntroductionBlock block;

  /// Text displayed when article is premium content.
  final String? premiumText;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (block.imageUrl != null) InlineImage(imageUrl: block.imageUrl!),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          child: PostContent(
            categoryName: block.category,
            title: block.title,
            author: block.author,
            publishedAt: block.publishedAt,
            premiumText: premiumText,
            isPremium: block.isPremium,
          ),
        ),
        const SizedBox(height: AppSpacing.lg),
      ],
    );
  }
}
