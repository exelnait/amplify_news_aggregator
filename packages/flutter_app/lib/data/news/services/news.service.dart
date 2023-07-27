import 'package:news_aggregator/di/injector.dart';

import 'package:news_aggregator/data/news/news.data.dart';
import 'package:news_aggregator/presentation/news/news.presentation.dart';

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