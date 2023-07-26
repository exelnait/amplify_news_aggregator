import 'package:injectable/injectable.dart';

import 'cubit/open_article.cubit.dart';
export 'cubit/open_article.cubit.dart';
import 'cubit/open_video.cubit.dart';
export 'cubit/open_video.cubit.dart';
import 'cubit/open_audio_player.cubit.dart';
export 'cubit/open_audio_player.cubit.dart';

export 'models/blocks/blocks.dart';
export 'models/news_item.model.dart';
export 'models/news_item_article_content.model.dart';
export 'models/news_item_article.model.dart';
export 'models/news_item_video.model.dart';
export 'models/news_item_audio.model.dart';

export 'location/open_news_item.location.dart';

export 'hooks/use_news_feed_query.hook.dart';

export 'mixins/open_news_item_page.mixin.dart';

export 'repository/news.repository.dart';

import 'services/news.service.dart';
export 'services/news.service.dart';
import 'services/news_cache.service.dart';
export 'services/news_cache.service.dart';

export 'screens/open_article.screen.dart';
export 'screens/open_video.screen.dart';
export 'screens/open_audio_player.screen.dart';

export 'components/news.components.dart';

import 'package:news_aggregator/graphql/schema.graphql.dart';
export 'package:news_aggregator/graphql/schema.graphql.dart';

import 'package:news_aggregator/modules/news/models/graphql/news_item_basic.fragment.graphql.dart';
import 'package:news_aggregator/modules/news/models/graphql/news_item_full.fragment.graphql.dart';
import 'package:news_aggregator/modules/news/repository/news.query.graphql.dart';

typedef SourceType = Enum$SourceType;

typedef NewsItemFullFragment = Fragment$NewsItemFull;
typedef NewsItemBasicFragment = Fragment$NewsItemBasic;
const NewsItemFullDocumentNode = documentNodeFragmentNewsItemFull;
const NewsItemBasicDocumentNode = documentNodeFragmentNewsItemBasic;

typedef GetNewsItemRSSQuery = Query$GetNewsItemRSS;

@module
abstract class NewsModule {
  NewsService get newsService => NewsService();
  NewsCacheService get newsCacheService => NewsCacheService();

  OpenArticleCubit get openArticleCubit => OpenArticleCubit(newsService, newsCacheService);
  OpenVideoCubit get openVideoCubit => OpenVideoCubit(newsService, newsCacheService);
  OpenAudioPlayerCubit get openAudioPlayerCubit => OpenAudioPlayerCubit(newsService, newsCacheService);
}