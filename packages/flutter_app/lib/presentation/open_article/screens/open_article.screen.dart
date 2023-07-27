
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:share_plus/share_plus.dart';

import 'package:news_aggregator/ui/app_ui.dart';
import 'package:news_aggregator/presentation/open_article/open_article.presentation.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

class OpenArticleScreen extends HookWidget {
  final String id;
  final bool isVideoArticle;

  void onFavoriteTap(String newsItemId) {}

  OpenArticleScreen(
      {super.key, required this.id, required this.isVideoArticle});

  @override
  Widget build(BuildContext context) {
    print('build open article');

    var cubit = useBloc<OpenArticleCubit>();
    useEffect(() {
      cubit.initArticle(id);
    }, [id]);

    final state = useBlocBuilder(cubit);

    final ValueNotifier<bool> isBottomBarVisible = useState(true);
    var scrollController = useScrollController();
    useEffect(() {
      print('open article controller add listeners');
      listener() {
        if (scrollController.position.userScrollDirection ==
            ScrollDirection.reverse) {
          isBottomBarVisible.value = false;
        }
        if (scrollController.position.userScrollDirection ==
            ScrollDirection.forward) {
          isBottomBarVisible.value = true;
        }
      }

      scrollController.addListener(listener);
      return () => scrollController.removeListener(listener);
    }, [scrollController]);

    final backgroundColor =
    isVideoArticle ? AppColors.darkBackground : AppColors.white;
    final foregroundColor =
    isVideoArticle ? AppColors.white : AppColors.highEmphasisSurface;

    var isSubscriber = false;

    return Scaffold(
      backgroundColor: backgroundColor,
      appBar: AppBar(
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarIconBrightness:
          isVideoArticle ? Brightness.light : Brightness.dark,
          statusBarBrightness:
          isVideoArticle ? Brightness.dark : Brightness.light,
        ),
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
          if (state.article?.url != null)
            Padding(
              key: const Key('articlePage_shareButton'),
              padding: const EdgeInsets.only(right: AppSpacing.lg),
              child: ShareButton(
                  shareText: 'Share',//context.l10n.shareText,
                  color: foregroundColor,
                  onPressed: () => {
                    Share.share(state.article!.url.toString())
                  }
              ),
            ),
          // if (!isSubscriber) const ArticleSubscribeButton()
        ],
      ),
      body: ArticleThemeOverride(
        isVideoArticle: isVideoArticle,
        child: ArticleContent(item: state.article, isLoading: state.isLoading),
      ),
    );
  }
}

@visibleForTesting
class ArticleSubscribeButton extends StatelessWidget {
  const ArticleSubscribeButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: AppSpacing.lg),
      child: Align(
        alignment: Alignment.centerRight,
        child: AppButton.smallRedWine(
          onPressed: () => {
            //showPurchaseSubscriptionDialog(context: context)
          },
          child: Text('Subscribe'),//context.l10n.subscribeButtonText
        ),
      ),
    );
  }
}
