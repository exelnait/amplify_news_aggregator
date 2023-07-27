// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;
import 'package:news_aggregator/data/news/news.data.dart' as _i3;
import 'package:news_aggregator/presentation/open_article/cubit/open_article.cubit.dart'
    as _i4;
import 'package:news_aggregator/presentation/open_podcast/cubit/open_podcast_player.cubit.dart'
    as _i5;
import 'package:news_aggregator/presentation/open_video/cubit/open_video.cubit.dart'
    as _i6;

/// ignore_for_file: unnecessary_lambdas
/// ignore_for_file: lines_longer_than_80_chars
extension GetItInjectableX on _i1.GetIt {
  /// initializes the registration of main-scope dependencies inside of [GetIt]
  _i1.GetIt init({
    String? environment,
    _i2.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i2.GetItHelper(
      this,
      environment,
      environmentFilter,
    );
    final newsDataModule = _$NewsDataModule();
    gh.factory<_i3.NewsCacheService>(() => newsDataModule.newsCacheService);
    gh.factory<_i3.NewsService>(() => newsDataModule.newsService);
    gh.factory<_i4.OpenArticleCubit>(() => newsDataModule.openArticleCubit);
    gh.factory<_i5.OpenPodcastPlayerCubit>(
        () => newsDataModule.openAudioPlayerCubit);
    gh.factory<_i6.OpenVideoCubit>(() => newsDataModule.openVideoCubit);
    return this;
  }
}

class _$NewsDataModule extends _i3.NewsDataModule {}
