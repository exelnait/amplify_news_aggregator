import 'package:injectable/injectable.dart';

import 'package:news_aggregator/graphql/schema.graphql.dart';
export 'package:news_aggregator/graphql/schema.graphql.dart';

import 'package:news_aggregator/presentation/open_article/cubit/open_article.cubit.dart';
import 'package:news_aggregator/presentation/open_podcast/cubit/open_podcast_player.cubit.dart';
import 'package:news_aggregator/presentation/open_video/cubit/open_video.cubit.dart';
import 'models/graphql/news_item_basic.fragment.graphql.dart';
import 'models/graphql/news_item_full.fragment.graphql.dart';
import 'news.data.dart';

export 'repository/news.repository.dart';
export 'repository/news.query.dart';

export 'services/news.service.dart';
export 'services/news_cache.service.dart';

typedef SourceType = Enum$SourceType;

typedef NewsItemFullFragment = Fragment$NewsItemFull;
typedef NewsItemBasicFragment = Fragment$NewsItemBasic;
const NewsItemFullDocumentNode = documentNodeFragmentNewsItemFull;
const NewsItemBasicDocumentNode = documentNodeFragmentNewsItemBasic;

@module
abstract class NewsDataModule {
  NewsService get newsService => NewsService();
  NewsCacheService get newsCacheService => NewsCacheService();

  OpenArticleCubit get openArticleCubit => OpenArticleCubit(newsService, newsCacheService);
  OpenVideoCubit get openVideoCubit => OpenVideoCubit(newsService, newsCacheService);
  OpenPodcastPlayerCubit get openAudioPlayerCubit => OpenPodcastPlayerCubit(newsService, newsCacheService);
}
