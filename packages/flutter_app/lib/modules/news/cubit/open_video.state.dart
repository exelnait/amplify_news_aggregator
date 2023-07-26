import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

part 'open_video.state.freezed.dart';

@freezed
class OpenVideoState with _$OpenVideoState {
  const factory OpenVideoState({
    NewsItemModelVideo? video
}) = _OpenVideoState;

  const OpenVideoState._();

  factory OpenVideoState.initial() => const OpenVideoState(video: null);
}