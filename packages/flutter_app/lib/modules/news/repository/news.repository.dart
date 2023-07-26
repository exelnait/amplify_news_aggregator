import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:news_aggregator/graphql/graphql_client.dart';

import 'package:news_aggregator/modules/news/news.module.dart';
import 'package:news_aggregator/modules/news/repository/news.query.graphql.dart';

class NewsRepository {
  Future<NewsItemFullFragment?> getNewsItemRSS(String id) async {
    var options = Options$Query$GetNewsItemRSS(variables: Variables$Query$GetNewsItemRSS(id: id));
    final QueryResult<Query$GetNewsItemRSS> result = await client.value.query(options);
    if (result.hasException) {
      throw result.exception!;
    }
    return result.parsedData?.getNewsItemRSS;
  }
}