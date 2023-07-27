import 'package:graphql_flutter/graphql_flutter.dart';

import 'package:news_aggregator/graphql/graphql_client.dart';
import 'package:news_aggregator/di/injector.dart';
import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

class NewsCacheService {
  NewsCacheService();

  dynamic? _getFragment(String id) {
    var fragmentFullRequest = FragmentRequest(
      fragment: const Fragment(
        document: NewsItemFullDocumentNode,
        fragmentName: 'NewsItemFull',
      ),
      idFields: {'__typename': 'NewsItem', 'id': id},
    );
    var fragmentBaseRequest = FragmentRequest(
      fragment: const Fragment(
        document: NewsItemBasicDocumentNode,
        fragmentName: 'NewsItemBasic',
      ),
      idFields: {'__typename': 'NewsItem', 'id': id},
    );

    final dataFull = client.value.readFragment(fragmentFullRequest);
    if (dataFull != null) {
      return NewsItemFullFragment.fromJson(dataFull);
    }
    final dataBase = client.value.readFragment(fragmentBaseRequest);
    if (dataBase != null) {
      return NewsItemBasicFragment.fromJson(dataBase);
    }
    return null;
  }

  NewsItemModelArticle? getNewsItemArticle(String id) {
    var fragment = _getFragment(id);
    if (fragment != null) {
      return NewsItemModelArticle.fromFragment(fragment);
    }
    return null;
  }

  NewsItemModelVideo? getNewsItemVideo(String id) {
    var fragment = _getFragment(id);
    if (fragment != null) {
      return NewsItemModelVideo.fromFragment(fragment);
    }
    return null;
  }

  NewsItemModelPodcast? getNewsItemPodcast(String id) {
    var fragment = _getFragment(id);
    if (fragment != null) {
      return NewsItemModelPodcast.fromFragment(fragment);
    }
    return null;
  }



}

final NewsCacheService newsCacheService = getIt<NewsCacheService>();