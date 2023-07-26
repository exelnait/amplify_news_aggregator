// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;
import 'package:news_aggregator/modules/news/news.module.dart' as _i3;

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
    final newsModule = _$NewsModule();
    gh.factory<_i3.NewsCacheService>(() => newsModule.newsCacheService);
    gh.factory<_i3.NewsService>(() => newsModule.newsService);
    gh.factory<_i3.OpenArticleCubit>(() => newsModule.openArticleCubit);
    gh.factory<_i3.OpenAudioPlayerCubit>(() => newsModule.openAudioPlayerCubit);
    gh.factory<_i3.OpenVideoCubit>(() => newsModule.openVideoCubit);
    return this;
  }
}

class _$NewsModule extends _i3.NewsModule {}
