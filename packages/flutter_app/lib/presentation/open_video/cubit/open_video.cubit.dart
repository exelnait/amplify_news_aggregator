import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:news_aggregator/di/injector.dart';

import 'package:news_aggregator/data/news/news.data.dart';

import 'open_video.state.dart';

class OpenVideoCubit extends Cubit<OpenVideoState> {
  final NewsService service;
  final NewsCacheService cacheService;

  OpenVideoCubit(this.service, this.cacheService) : super(const OpenVideoState());

  void openVideo(String videoId) async {
    var cachedVideo = newsCacheService.getNewsItemVideo(videoId);
    print('cachedVideo');
    print(cachedVideo);
    //TODO get additional info
    if (cachedVideo != null) {
      emit(state.copyWith(video: cachedVideo));
    } else {
      //TODO required video
    }
  }

  void closeVideo() {
    emit(const OpenVideoState());
  }
}

final OpenVideoCubit openVideoCubit = getIt<OpenVideoCubit>();
