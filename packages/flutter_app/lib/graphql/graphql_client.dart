import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

final HttpLink httpLink = HttpLink(
    'https://4yimvn6ugjd25jbcjx42y7iyli.appsync-api.eu-central-1.amazonaws.com/graphql',
    defaultHeaders: {
      'x-api-key': 'da2-ainiq5obybet7k36nmorpldmny'
    }
);


final Link link =  httpLink;

ValueNotifier<GraphQLClient> client = ValueNotifier(
  GraphQLClient(
    link: link,
    cache: GraphQLCache(store: InMemoryStore()),
  ),
);