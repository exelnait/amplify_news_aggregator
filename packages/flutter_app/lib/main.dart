import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hooked_bloc/hooked_bloc.dart';
import 'package:news_aggregator/di/injector.dart';
import 'package:news_aggregator/ui/app_ui.dart';

import 'amplifyconfiguration.dart';

import 'package:news_aggregator/modules/newsstand/newsstand.module.dart';
import 'package:news_aggregator/modules/main/main.module.dart';
import 'package:news_aggregator/modules/news/news.module.dart';

import 'graphql/graphql_client.dart';
import 'modules/home_feed/home_feed.module.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await configureDependencies();
  await _init();
  final routerDelegate = BeamerDelegate(
    initialPath: '/feed',
    locationBuilder: BeamerLocationBuilder(
      beamLocations: [
        MainLocation(),
        OpenNewsItemLocation(),
        NewsStandLocation(),
        PublisherLocation(),
      ],
    ),
  );
  runApp(
      GraphQLProvider(
        client: client,
        child: HookedBlocConfigProvider(
          injector: () => getIt.get,
          builderCondition: (state) => state != null, // Global build condition
          listenerCondition: (state) => state != null, // Global listen condition
          child: MyApp(routerDelegate),
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
  MyApp(this.routerDelegate);

  final routerDelegate;

  @override
  Widget build(BuildContext context) {
    print('build');
    return MaterialApp.router(
      themeMode: ThemeMode.light,
      theme: const AppTheme().themeData,
      darkTheme: const AppDarkTheme().themeData,
      // localizationsDelegates: AppLocalizations.localizationsDelegates,
      // supportedLocales: AppLocalizations.supportedLocales,
      routerDelegate: routerDelegate,
      builder: (context, router) =>
          Stack(
            children: [
              router!,
              OpenAudioPlayerScreen()
            ],
          ),
      routeInformationParser: BeamerParser(),
      backButtonDispatcher: BeamerBackButtonDispatcher(
        delegate: routerDelegate,
      ),
    );
  }
}