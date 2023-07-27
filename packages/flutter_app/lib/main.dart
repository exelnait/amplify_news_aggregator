import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:news_aggregator/di/injector.dart';
import 'package:news_aggregator/presentation/open_podcast/open_podcast.presentation.dart';
import 'package:news_aggregator/ui/app_ui.dart';

import 'amplifyconfiguration.dart';

import 'graphql/graphql_client.dart';
import 'presentation/common/router.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await configureDependencies();
  await _init();

  runApp(
      GraphQLProvider(
        client: client,
        child: HookedBlocConfigProvider(
          injector: () => getIt.get,
          builderCondition: (state) => state != null, // Global build condition
          listenerCondition: (state) => state != null, // Global listen condition
          child: MyApp(),
        ),
      )
  );
}

Future<void> _init() async {
  final authPlugin = AmplifyAuthCognito();
  await Amplify.addPlugins([authPlugin]);
  try {
    await Amplify.configure(amplifyconfig);
  } on AmplifyAlreadyConfiguredException {
    safePrint(
        'Tried to reconfigure Amplify; this can occur when your app restarts on Android.');
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Authenticator(
      child: MaterialApp.router(
        themeMode: ThemeMode.light,
        theme: const AppTheme().themeData,
        darkTheme: const AppDarkTheme().themeData,
          routerConfig: routerConfig,
          builder:
              (context, child) {
            return Authenticator.builder()(context, Stack(
                children: [
                  child!,
                  OpenPodcastPlayerScreen()
                ]
            ));
          }
      ),
    );
  }
}