
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:go_router/go_router.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';

class OpenVideoAppBar extends StatelessWidget {
  final NewsItemModelVideo newsItem;
  final BuildContext context;

  final Function(String id) onFavoriteTap;

  const OpenVideoAppBar({
    Key? key,
    required this.context,
    required this.newsItem,
    required this.onFavoriteTap,
  }) : super(key: key);

  _buildActions() {
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
            context.pop();
          }),
    );
  }
}