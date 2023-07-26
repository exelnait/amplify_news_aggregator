import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

part 'news_item_audio.model.freezed.dart';

@freezed
class NewsItemModelAudio
    with _$NewsItemModelAudio
    implements NewsItemModel {
  const factory NewsItemModelAudio({
    required List<NewsBlock> content,
    required List<NewsBlock> contentPreview,
    required PostBlock post,
    required SourceType type,
    // Audio fields only
    required Uri url,
    required String duration,
  }) = _NewsItemModelAudio;

  factory NewsItemModelAudio.fromFragment(NewsItemFullFragment item) {
    //NewsItemFullFragment
    // if (item is NewsItemFullFragment) {
      String category = 'No category';
      String imageUrl = item.cover?.resized?.medium ?? item.itunes!.coverUrl ?? '';
      return NewsItemModelAudio(
        type: item.type,
          post: PostMediumBlock(
            id: item.id,
            category: category,
            publishedAt: item.publishedAt,
            imageUrl: imageUrl,
            title: item.title,
            action: NavigateToPodcastAction(podcastId: item.id),
          ),
          content: [ /*AudioPLayer*/
          ],
          contentPreview: [],
          url: Uri.parse(
            item.itunes!.audioUrl,
          ),
          duration: item.itunes!.durationFormatted!);
    // }
  }
}
