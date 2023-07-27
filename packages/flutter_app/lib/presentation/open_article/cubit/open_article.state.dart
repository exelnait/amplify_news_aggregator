import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/presentation/news/news.presentation.dart';

part 'open_article.state.freezed.dart';

@freezed
class OpenArticleState with _$OpenArticleState {
  const factory OpenArticleState({
    NewsItemModelArticle? article,
    @Default(false) bool isLoading,
  }) = _OpenArticleState;

  const OpenArticleState._();
}