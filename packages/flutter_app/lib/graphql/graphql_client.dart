import 'dart:convert';

import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_core/amplify_core.dart';
import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../amplifyconfiguration.dart';
final amplifyConfig = jsonDecode(amplifyconfig);

final HttpLink httpLink = HttpLink(
    amplifyConfig["api"]["plugins"]["awsAPIPlugin"]["newsaggregator"]["endpoint"] as String
);
final AuthLink authLink = AuthLink(
  getToken: () async {
    final result = await Amplify.Auth.fetchAuthSession(
        options: FetchAuthSessionOptions());
    final cognitoAuthSession = (result as CognitoAuthSession);
    var token =  cognitoAuthSession.userPoolTokensResult.value.idToken.raw;
    return token;
  },
);


final Link link =  authLink.concat(httpLink);

ValueNotifier<GraphQLClient> client = ValueNotifier(
  GraphQLClient(
    link: link,
    cache: GraphQLCache(store: InMemoryStore()),
  ),
);