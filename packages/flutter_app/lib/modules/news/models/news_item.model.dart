import 'package:news_aggregator/modules/news/news.module.dart';

/// {@template news_item}
/// An class that contains metadata representing a news item.
/// News items contain the post used within a news feed as well as
/// the article content.
/// {@endtemplate}
abstract class NewsItemModel {
  /// The associated source type.
  SourceType get type;

  /// The associated content.
  List<NewsBlock> get content;

  /// The associated preview of the content.
  List<NewsBlock> get contentPreview;

  /// The associated [NewsBlock] for the feed.
  PostBlock get post;
}
