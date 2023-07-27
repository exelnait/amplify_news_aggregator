import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:news_aggregator/presentation/common/common.presentation.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';
import 'package:news_aggregator/presentation/news_stand/news_stand.presentation.dart';
import 'package:news_aggregator/presentation/open_article/open_article.presentation.dart';
import 'package:news_aggregator/presentation/open_video/open_video.presentation.dart';
import 'package:news_aggregator/presentation/search/screens/search.screen.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorNewsFeedKey = GlobalKey<NavigatorState>(debugLabel: 'NewsFeed');
final _shellNavigatorNewsStandKey = GlobalKey<NavigatorState>(debugLabel: 'NewsStand');
final _shellNavigatorSearchKey = GlobalKey<NavigatorState>(debugLabel: 'Search');

final routerConfig = GoRouter(
  initialLocation: '/news_feed',
  navigatorKey: _rootNavigatorKey,
  routes: [
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return ScaffoldWithNestedNavigation(
            navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          navigatorKey: _shellNavigatorNewsFeedKey,
          routes: [
            // top route inside branch
            GoRoute(
              path: '/news_feed',
              builder: (context, state) =>
              const NewsFeedScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorNewsStandKey,
          routes: [
            // top route inside branch
            GoRoute(
              path: '/news_stand',
              builder: (context, state) =>
              const NewsStandScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorSearchKey,
          routes: [
            // top route inside branch
            GoRoute(
              path: '/search',
              builder: (context, state) => const SearchScreen(),
            ),
          ],
        ),
      ],
    ),
    GoRoute(
      path: '/publisher/:id',
      builder: (context, state) => PublisherNewsFeedScreen(publisherId: state.pathParameters['id']!),
    ),
    GoRoute(
      path: '/open/rss/:id',
      builder: (context, state) => OpenArticleScreen(id: state.pathParameters['id']!, isVideoArticle: false),
    ),
    GoRoute(
      path: '/open/youtube/:id',
      builder: (context, state) => OpenVideoScreen(videoId: state.pathParameters['id']!),
    ),
  ],
);