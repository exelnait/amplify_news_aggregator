import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

import 'package:news_aggregator/presentation/open_article/open_article.presentation.dart';
import 'package:news_aggregator/presentation/open_video/open_video.presentation.dart';
import 'package:news_aggregator/ui/app_ui.dart';
import 'package:share_plus/share_plus.dart';

class OpenVideoScreen extends HookWidget {
  String videoId;

  void onFavoriteTap(String newsItemId) {}

  OpenVideoScreen({super.key, required this.videoId});

  @override
  Widget build(BuildContext context) {
    final cubit = useBloc<OpenVideoCubit>();
    useEffect(() {
      cubit.openVideo(videoId);
    }, [videoId]);

    final backgroundColor = AppColors.white;
    final foregroundColor = AppColors.highEmphasisSurface;

    final state = useBlocBuilder(cubit);
    var newsItem = state.video!;
    return Scaffold(
        backgroundColor: backgroundColor,
        appBar: AppBar(
          systemOverlayStyle: SystemUiOverlayStyle(
              statusBarIconBrightness: Brightness.dark,
              statusBarBrightness: Brightness.light),
          leading:
              // isVideoArticle
              //     ? AppBackButton.light(onTap: () {
              //   context.go("/feed");
              // })
              //     :
              AppBackButton(onTap: () {
            GoRouter.of(context).pop();
          }),
          actions: [
            Padding(
              key: const Key('articlePage_shareButton'),
              padding: const EdgeInsets.only(right: AppSpacing.lg),
              child: ShareButton(
                  shareText: 'Share', //context.l10n.shareText,
                  color: foregroundColor,
                  onPressed: () => {
                        Share.share(
                            "https://www.youtube.com/watch?v=${newsItem.videoId}")
                      }),
            )
          ],
        ),
        body: ArticleThemeOverride(
            isVideoArticle: false,
            child: Column(
              children: <Widget>[
                YouTubeVideoPlayer(
                    videoId: newsItem.videoId!,
                    cover: newsItem.post.imageUrl != null
                        ? OpenVideoCover(url: newsItem.post.imageUrl!)
                        : Container()),
                ...newsItem.content
                    .map((block) => ArticleContentItem(block: block))
              ],
            )),
        floatingActionButtonAnimator: FloatingActionButtonAnimator.scaling,
        floatingActionButtonLocation:
            FloatingActionButtonLocation.centerDocked);
  }
}
