import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/di/injector.dart';

import 'open_podcast_player.state.dart';

class OpenPodcastPlayerCubit extends Cubit<OpenPodcastPlayerState> {
  final NewsService service;
  final NewsCacheService cacheService;

  OpenPodcastPlayerCubit(this.service, this.cacheService) : super(OpenPodcastPlayerState());

  void openPlayer(String audioId) async {
    print('OpenPodcastPlayerCubit openPlayer');
    var cachedPodcast = newsCacheService.getNewsItemPodcast(audioId);
    if (cachedPodcast != null) {
      emit(state.copyWith(audio: cachedPodcast));
    } else {
      //TODO required video
    }
  }

  void closePlayer() {
    emit(OpenPodcastPlayerState());
  }
}

final OpenPodcastPlayerCubit openPodcastPlayerCubit = getIt<OpenPodcastPlayerCubit>();
