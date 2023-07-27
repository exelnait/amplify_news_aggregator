import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:visibility_detector/visibility_detector.dart';

import 'package:news_aggregator/presentation/open_article/open_article.presentation.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/ui/app_ui.dart';

class ArticleContent extends StatelessWidget {

  final bool isLoading;
  final NewsItemModelArticle? item;

  const ArticleContent({super.key, required this.isLoading, required this.item});

  void _handleShareFailure(BuildContext context) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        const SnackBar(
          key: Key('articleContent_shareFailure_snackBar'),
          content: Text(
              'Share failure'
          ),
        ),
      );
  }

  @override
  Widget build(BuildContext context) {
    final content = item?.content;
    final uri = item?.url;
    final hasMoreContent = content != null ? content.length <= 1 : true;
    final isFailure = false;

    if (isLoading) {
      return const ArticleContentLoaderItem(
        key: Key('articleContent_empty_loaderItem'),
      );
    }

    if (isFailure) {
      return NetworkError(
        onRetry: () {

        },
      );
    }
    if (content != null && content.isNotEmpty) {
      return Stack(
        alignment: AlignmentDirectional.bottomCenter,
        children: [
          SelectionArea(
            child: ListView.builder(
              padding: EdgeInsets.zero,
              itemCount: content.length + 1,
              itemBuilder: (context, index) {
                if (index == content.length) {
                  return hasMoreContent
                      ? Padding(
                    padding: EdgeInsets.only(
                      top: content.isEmpty ? AppSpacing.xxxlg : 0,
                    ),
                    child: ArticleContentLoaderItem(
                      key: const Key(
                        'articleContent_moreContent_loaderItem',
                      ),
                      onPresented: () {
                        if (!isLoading) {
                          // context
                          //     .read<ArticleBloc>()
                          //     .add(const ArticleRequested());
                        }
                      },
                    ),
                  )
                      : const ArticleTrailingContent();
                }

                final block = content[index];
                return VisibilityDetector(
                  key: ValueKey(block),
                  onVisibilityChanged: (visibility) {
                    if (!visibility.visibleBounds.isEmpty) {
                      // context
                      //     .read<ArticleBloc>()
                      //     .add(ArticleContentSeen(contentIndex: index));
                    }
                  },
                  child: ArticleContentItem(
                    block: block,
                    onSharePressed: uri != null && uri
                        .toString()
                        .isNotEmpty
                        ? () {
                      Share.share(uri.toString()).catchError((_) {
                        _handleShareFailure(context);
                      });
                    }
                        : null,
                  ),
                );
              },
            ),
          ),
          //TODO const StickyAd(),
        ],
      );
    } else {
      return const Text('no content');
    }
  }}