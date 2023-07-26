import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:news_aggregator/modules/news/news.module.dart';

import 'open_article.state.dart';

class OpenArticleCubit extends Cubit<OpenArticleState> {
  final NewsService service;
  final NewsCacheService cacheService;

  OpenArticleCubit(this.service, this.cacheService) : super(OpenArticleState());

  void initArticle(String articleId) async {
    print( 'init article $articleId' );
    var cachedArticle = newsCacheService.getNewsItemArticle(articleId);
    if (cachedArticle != null) {
      emit(state.copyWith(isLoading: false, article: cachedArticle));
      print(cachedArticle.content);
      if (cachedArticle.content.length <= 1) {
        var articleFromServer = await newsService.getArticle(articleId);
        if (articleFromServer != null) {
          emit(state.copyWith(article: articleFromServer));
        }
      }
    } else {
      emit(state.copyWith(isLoading: true));
      var articleFromServer = await newsService.getArticle(articleId);
      if (articleFromServer != null) {
        emit(state.copyWith(isLoading: false, article: articleFromServer));
      } else {
        emit(state.copyWith(isLoading: false));
      }
    }
  }
}

// COnvert List tp Map
