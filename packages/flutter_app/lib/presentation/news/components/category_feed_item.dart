import 'package:flutter/material.dart' hide Spacer;

import 'package:news_aggregator/presentation/news/news.presentation.dart';

class CategoryFeedItem extends StatelessWidget {
  const CategoryFeedItem({
    super.key,
    required this.block,
    required this.onOpenArticle,
    required this.onOpenVideo,
    required this.onOpenPodcast,
  });

  /// The associated [NewsBlock] instance.
  final NewsBlock block;

  final Function({required String articleId, bool isVideoArticle}) onOpenArticle;
  final Function({required String videoId}) onOpenVideo;
  final Function({required String podcastId}) onOpenPodcast;

  @override
  Widget build(BuildContext context) {
    final newsBlock = block;

    final isUserSubscribed = false;

    // if (newsBlock is DividerHorizontalBlock) {
    //   return DividerHorizontal(block: newsBlock);
    // } else if (newsBlock is SpacerBlock) {
    //   return Spacer(block: newsBlock);
    // } else if (newsBlock is SectionHeaderBlock) {
    //   return SectionHeader(
    //     block: newsBlock,
    //     onPressed: (action) => _onFeedItemAction(context, action),
    //   );
    // } else
    if (newsBlock is PostLargeBlock) {
      return PostLarge(
        block: newsBlock,
        // premiumText: context.l10n.newsBlockPremiumText,
        onPressed: (action) => _onFeedItemAction(context, action),
      );
    } else if (newsBlock is PostMediumBlock) {
      return PostMedium(
        block: newsBlock,
        onPressed: (action) => _onFeedItemAction(context, action),
      );
    } else if (newsBlock is PostSmallBlock) {
      return PostSmall(
        block: newsBlock,
        onPressed: (action) => _onFeedItemAction(context, action),
      );
    // } else if (newsBlock is PostGridGroupBlock) {
    //   return PostGrid(
    //     gridGroupBlock: newsBlock,
    //     premiumText: context.l10n.newsBlockPremiumText,
    //     onPressed: (action) => _onFeedItemAction(context, action),
    //   );
    // } else if (newsBlock is NewsletterBlock) {
    //   return const Newsletter();
    // } else if (newsBlock is BannerAdBlock) {
    //   return BannerAd(
    //     block: newsBlock,
    //     adFailedToLoadTitle: context.l10n.adLoadFailure,
    //   );
    } else {
      // Render an empty widget for the unsupported block type.
      return const SizedBox();
    }
  }

  /// Handles actions triggered by tapping on feed items.
  Future<void> _onFeedItemAction(
    BuildContext context,
    BlockAction action,
  ) async {
    if (action is NavigateToArticleAction) {
      onOpenArticle(articleId: action.articleId);
    } else if (action is NavigateToVideoArticleAction) {
      onOpenArticle(articleId: action.articleId, isVideoArticle: true);
    } else if (action is NavigateToVideoAction) {
      onOpenVideo(videoId: action.videoId);
    } else if (action is NavigateToPodcastAction) {
      onOpenPodcast(podcastId: action.podcastId);
    }
    // else if (action is NavigateToFeedCategoryAction) {
    //   context
    //       .read<CategoriesBloc>()
    //       .add(CategorySelected(category: action.category));
    // }
  }
}
