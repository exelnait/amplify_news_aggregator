import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';

part 'open_podcast_player.state.freezed.dart';

@freezed
class OpenPodcastPlayerState with _$OpenPodcastPlayerState {
  const factory OpenPodcastPlayerState({
    NewsItemModelPodcast? audio
  }) = _OpenPodcastPlayerState;

  const OpenPodcastPlayerState._();
}