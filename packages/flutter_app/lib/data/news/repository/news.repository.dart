import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:news_aggregator/graphql/graphql_client.dart';

import 'package:news_aggregator/data/news/news.data.dart';


class NewsRepository {
  Future<NewsItemFullFragment?> getNewsItemRSS(String id) async {
    var options = GetNewsItemRSSQueryOptions(variables: GetNewsItemRSSQueryVariables(id: id));
    final QueryResult<GetNewsItemRSSQuery> result = await client.value.query(options);
    if (result.hasException) {
      throw result.exception!;
    }
    return result.parsedData?.getNewsItemRSS;
  }
}