import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooked_bloc/hooked_bloc.dart';

import 'package:news_aggregator/presentation/open_article/open_article.presentation.dart';
import 'package:news_aggregator/presentation/open_video/open_video.presentation.dart';

class OpenVideoScreen extends HookWidget {
  String videoId;

  void onFavoriteTap(String newsItemId) {}

  OpenVideoScreen({super.key, required this.videoId});

  @override
  Widget build(BuildContext context) {
    final cubit = useBloc<OpenVideoCubit>();
    useEffect(() { cubit.openVideo(videoId);}, [videoId]);

    final state = useBlocBuilder(cubit);
    var newsItem = state.video!;
    return Scaffold(
          backgroundColor: Theme.of(context).shadowColor,
          body: SafeArea(
              child: Container(
              color: Colors.transparent,
              child: Material(
                  color: Colors.white,
                  child: Column(
                    children: <Widget>[
                      OpenVideoAppBar(
                          context: context,
                          newsItem: newsItem,
                          onFavoriteTap: onFavoriteTap),
                      YouTubeVideoPlayer(
                          videoId: newsItem.videoId!,
                          cover: newsItem.post.imageUrl != null ? OpenVideoCover(url: newsItem.post.imageUrl!) : Container()),
                      ...newsItem.content.map((block) => ArticleContentItem(
                        block: block
                      ))
                    ],
                  )))),
          floatingActionButtonAnimator: FloatingActionButtonAnimator.scaling,
          floatingActionButtonLocation:
              FloatingActionButtonLocation.centerDocked);
  }
}
