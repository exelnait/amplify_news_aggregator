import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

part 'open_audio_player.state.freezed.dart';

@freezed
class OpenAudioPlayerState with _$OpenAudioPlayerState {
  const factory OpenAudioPlayerState({
    NewsItemModelAudio? audio
  }) = _OpenAudioPlayerState;

  const OpenAudioPlayerState._();
}