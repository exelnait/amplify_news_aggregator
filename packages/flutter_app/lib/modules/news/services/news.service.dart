import 'package:injectable/injectable.dart';
import 'package:news_aggregator/di/injector.dart';

import 'package:news_aggregator/modules/news/news.module.dart';

class NewsService {
  final _repository = NewsRepository();

  Future<NewsItemModelArticle?> getArticle(String id) async {
    var item = await _repository.getNewsItemRSS(id);
    if (item != null) {
      return NewsItemModelArticle.fromFragment(item);
    }
    return null;
  }
}

final NewsService newsService = getIt<NewsService>();