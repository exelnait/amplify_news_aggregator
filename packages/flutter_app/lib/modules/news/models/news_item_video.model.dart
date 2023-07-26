import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

part 'news_item_video.model.freezed.dart';

@freezed
class NewsItemModelVideo
    with _$NewsItemModelVideo
    implements NewsItemModel {
  const factory NewsItemModelVideo({
    required List<NewsBlock> content,
    required List<NewsBlock> contentPreview,
    required PostBlock post,
    required SourceType type,
    // Video fields only
    required String? videoId,
  }) = _NewsItemModelVideo;

  factory NewsItemModelVideo.fromFragment(NewsItemFullFragment item) {
    String category = 'No category';
    String imageUrl = item.cover?.resized?.medium ?? item.youtube!.coverUrl ?? '';
    return NewsItemModelVideo(
      type: item.type,
        post: PostMediumBlock(
          id: item.id,
          category: category,
          publishedAt: item.publishedAt,
          imageUrl: imageUrl,
          title: item.title,
          action: NavigateToVideoAction(videoId: item.id),
    ),
        content: [
          ArticleIntroductionBlock(
            category: category,
            publishedAt: item.publishedAt,
            title: item.title,
          ),
        ],
        contentPreview: [],
        videoId: item.youtube!.videoId);
  }
}
