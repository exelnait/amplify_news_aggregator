import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:news_aggregator/ui/app_ui.dart';

class ArticleTrailingContent extends StatelessWidget {
  const ArticleTrailingContent({super.key});

  @override
  Widget build(BuildContext context) {
    final hasReachedArticleViewsLimit = false;
    final isUserSubscribed = false;
    final isArticlePreview = false;
    final isArticlePremium = false;

    final showSubscribeWithArticleLimitModal =
        hasReachedArticleViewsLimit && !isUserSubscribed;

    final showSubscribeModal = isArticlePremium && !isUserSubscribed;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        SafeArea(
          bottom: !isArticlePreview,
          child: Column(
            key: const Key('articleTrailingContent_column'),
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // if (relatedArticles.isNotEmpty && !isArticlePreview) ...[
              //   const SizedBox(height: AppSpacing.xlg),
              //   Padding(
              //     padding:
              //         const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              //     child: Text(
              //       context.l10n.relatedStories,
              //       style: Theme.of(context).textTheme.displaySmall,
              //     ),
              //   ),
              //   const SizedBox(height: AppSpacing.lg),
              //   ...relatedArticles.map(
              //     (articleBlock) => CategoryFeedItem(block: articleBlock),
              //   ),
              //   const SizedBox(height: AppSpacing.lg),
              // ],
              // if (!isArticlePreview) ...[
              //   const SizedBox(height: AppSpacing.xlg),
              //   const Padding(
              //     padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              //     child: ArticleComments(),
              //   ),
              //   const SizedBox(height: AppSpacing.lg),
              // ],
              // if (isArticlePreview) ...[
              //   const SizedBox(height: AppSpacing.xlg),
              //   if (showSubscribeModal)
              //     const SubscribeModal()
              //   else if (showSubscribeWithArticleLimitModal)
              //     const SubscribeWithArticleLimitModal(),
              // ],
            ],
          ),
        ),
        if (isArticlePreview) const ArticleTrailingShadow(),
      ],
    );
  }
}

@visibleForTesting
class ArticleTrailingShadow extends StatelessWidget {
  const ArticleTrailingShadow({super.key});

  static const _gradientHeight = 256.0;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: -_gradientHeight,
      left: 0,
      right: 0,
      child: Column(
        children: [
          Container(
            height: _gradientHeight,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppColors.white.withOpacity(0),
                  AppColors.white.withOpacity(1),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
