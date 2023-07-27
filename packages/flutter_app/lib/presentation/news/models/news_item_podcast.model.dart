import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

part 'news_item_podcast.model.freezed.dart';

@freezed
class NewsItemModelPodcast
    with _$NewsItemModelPodcast
    implements NewsItemModel {
  const factory NewsItemModelPodcast({
    required List<NewsBlock> content,
    required List<NewsBlock> contentPreview,
    required PostBlock post,
    required SourceType type,
    // Podcast fields only
    required Uri url,
    required String duration,
  }) = _NewsItemModelPodcast;

  factory NewsItemModelPodcast.fromFragment(NewsItemFullFragment item) {
    //NewsItemFullFragment
    // if (item is NewsItemFullFragment) {
      String category = 'No category';
      String imageUrl = item.cover?.resized?.medium ?? item.itunes!.coverUrl ?? '';
      return NewsItemModelPodcast(
        type: item.type,
          post: PostMediumBlock(
            id: item.id,
            category: category,
            publishedAt: item.publishedAt,
            imageUrl: imageUrl,
            title: item.title,
            action: NavigateToPodcastAction(podcastId: item.id),
          ),
          content: [ /*PodcastPLayer*/
          ],
          contentPreview: [],
          url: Uri.parse(
            item.itunes!.audioUrl,
          ),
          duration: item.itunes!.durationFormatted!);
    // }
  }
}
