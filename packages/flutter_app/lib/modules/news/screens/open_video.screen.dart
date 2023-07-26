import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:share_plus/share_plus.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

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
                      _OpenVideoAppBar(
                          context: context,
                          newsItem: newsItem,
                          onFavoriteTap: onFavoriteTap),
                      YouTubeVideoPlayer(
                          videoId: newsItem.videoId!,
                          cover: newsItem.post.imageUrl != null ? NewsItemCover(url: newsItem.post.imageUrl!) : Container()),
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

class _OpenVideoAppBar extends StatelessWidget {
  final NewsItemModelVideo newsItem;
  final BuildContext context;

  final Function(String id) onFavoriteTap;

  const _OpenVideoAppBar({
    Key? key,
    required this.context,
    required this.newsItem,
    required this.onFavoriteTap,
  }) : super(key: key);

  _buildActions() {
    // final mediaQuery = MediaQuery.of(context);
    List<Widget> actions = [
      /** TODO: isFavorite */ false
          ? IconButton(
              tooltip: 'Remove from favorites',
              icon: const Icon(Icons.star),
              onPressed: () {
//          onFavoriteTap(widget.video.id);
              },
            )
          : IconButton(
              tooltip: 'Add to favorites',
              icon: const Icon(Icons.star_border),
              onPressed: () {
                onFavoriteTap(newsItem.post.id);
              },
            )
    ];
      actions.add(IconButton(
        tooltip: 'Open in Browser',
        icon: const Icon(Icons.share),
        onPressed: () {
          Share.share('https://youtube.com/watch?v=${newsItem.videoId}');
        },
      ));
    return actions;
  }

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Color.fromRGBO(22, 20, 20, 80),
      elevation: 0,
      toolbarHeight: 40,
      actions: _buildActions(),
      leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).pop();
          }),
    );
  }
}

Widget _buildButtonColumn(IconData icon, String text) {
  return Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: <Widget>[
      Container(
        padding: const EdgeInsets.only(bottom: 8.0, right: 10),
        child: Icon(
          icon,
          color: Colors.grey[700],
        ),
      ),
      Text(
        text,
        style: TextStyle(color: Colors.grey[700]),
      ),
    ],
  );
}