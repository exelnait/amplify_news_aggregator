import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:news_aggregator/di/injector.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

import 'open_audio_player.state.dart';

class OpenAudioPlayerCubit extends Cubit<OpenAudioPlayerState> {
  final NewsService service;
  final NewsCacheService cacheService;

  OpenAudioPlayerCubit(this.service, this.cacheService) : super(OpenAudioPlayerState());

  void openPlayer(String audioId) async {
    print('OpenAudioPlayerCubit openPlayer');
    var cachedAudio = newsCacheService.getNewsItemAudio(audioId);
    if (cachedAudio != null) {
      emit(state.copyWith(audio: cachedAudio));
    } else {
      //TODO required video
    }
  }

  void closePlayer() {
    emit(OpenAudioPlayerState());
  }
}

final OpenAudioPlayerCubit openAudioPlayerCubit = getIt<OpenAudioPlayerCubit>();
