import 'package:flutter/material.dart';
import 'package:news_aggregator/ui/app_ui.dart';
import 'package:share_plus/share_plus.dart';
import 'package:visibility_detector/visibility_detector.dart';

import 'article_content_loader_item.dart';
import 'article_trailing_content.dart';
import 'package:news_aggregator/modules/news/news.module.dart';

class ArticleContent extends StatelessWidget {

  final bool isLoading;
  final NewsItemModelArticle? item;

  const ArticleContent({super.key, required this.isLoading, required this.item});

  void _handleShareFailure(BuildContext context) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(
          key: const Key('articleContent_shareFailure_snackBar'),
          content: Text(
              'Share failure'
            // context.l10n.shareFailure,
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
      return Text('no content');
    }
  }}

// class ArticleContentSeenListener extends StatelessWidget {
//   const ArticleContentSeenListener({
//     super.key,
//     required this.child,
//   });
//
//   final Widget child;
//
//   @override
//   Widget build(BuildContext context) {
//     return BlocListener<ArticleBloc, ArticleState>(
//       listener: (context, state) => context.read<AnalyticsBloc>().add(
//             TrackAnalyticsEvent(
//               ArticleMilestoneEvent(
//                 milestonePercentage: state.contentMilestone,
//                 articleTitle: state.title!,
//               ),
//             ),
//           ),
//       listenWhen: (previous, current) =>
//           previous.contentMilestone != current.contentMilestone,
//       child: child,
//     );
//   }
// }
