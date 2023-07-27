import 'dart:convert';

import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

part 'news_item_article.model.freezed.dart';

@freezed
class NewsItemModelArticle
    with _$NewsItemModelArticle
    implements NewsItemModel {
  const factory NewsItemModelArticle(
      {required List<NewsBlock> content,
      required List<NewsBlock> contentPreview,
      required PostBlock post,
      required SourceType type,

      /// Article content summary.
      String? summary,

      /// The associated article url.
      required Uri url}) = _NewsItemModelArticle;

  factory NewsItemModelArticle.fromFragment(NewsItemFullFragment item) {
    // if (item is NewsItemFullFragment) {
    var hasContent = item.rss?.contentJson != null;
    List<NewsContentChildren> parsedContent = [];
    if (hasContent) {
      var decoded = json.decode(item.rss!.contentJson!) as List;
      parsedContent =
          decoded.map((item) => NewsContentChildren.fromJson(item)).toList();
    }
    String category = item.rss!.categories?.first ?? 'No category';
    String author = item.rss!.author ?? 'No Author';
    String imageUrl = item.cover?.resized?.medium ?? item.rss!.coverUrl ?? '';
    return NewsItemModelArticle(
        type: item.type,
        post: PostMediumBlock(
            id: item.id,
            category: category,
            author: author,
            publishedAt: item.publishedAt,
            imageUrl: imageUrl,
            title: item.title,
            action: NavigateToArticleAction(articleId: item.id)),
        content: [
          ArticleIntroductionBlock(
            category: category,
            author: author,
            publishedAt: item.publishedAt,
            title: item.title,
            imageUrl: imageUrl,
          ),
          if (parsedContent.isNotEmpty)
            ..._convertArticleParsedJsonToBlocks(parsedContent),
        ],
        contentPreview: [],
        url: Uri.parse(
          item.rss!.url,
        ),
        summary: item.rss?.summary);
    // }
  }
}

List<NewsBlock> _convertArticleParsedJsonToBlocks(
    List<NewsContentChildren> childrenList) {
  List<NewsBlock> blocks = [];
  for (NewsContentChildren child in childrenList) {
    print(child.type);
    if (child.type == ArticleJsonChildType.paragraph &&
        child.children != null &&
        child.children!.isNotEmpty) {
      if (child.children!.length == 1 && child.children![0].type ==  ArticleJsonChildType.text) {
        if (child.type == ArticleJsonChildType.linebreak) {
          blocks.add(const SpacerBlock(spacing: Spacing.extraSmall));
        }
      } else {
        blocks.add(TextParagraphBlock(
            children: child.children!
                .map((child) => NewsContentChild.fromJson(child.toJson()))
                .toList()));
      }
    }
    if (child.content != null && (child.type == ArticleJsonChildType.header2 || child.type == ArticleJsonChildType.header3)) {
      blocks.add(TextHeadlineBlock(text: child.content!));
    }
    if (child.type == ArticleJsonChildType.linebreak) {
      blocks.add(const SpacerBlock(spacing: Spacing.extraSmall));
    }
    if (child.type == ArticleJsonChildType.embed &&
        child.embedType == ArticleJsonEmbedType.image &&
        child.href != null) {
      blocks.add(ImageBlock(imageUrl: child.href!));
    }
  }

  return blocks;
}
