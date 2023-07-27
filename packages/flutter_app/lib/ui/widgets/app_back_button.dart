import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:news_aggregator/ui/app_ui.dart';

/// {@template app_back_button}
/// IconButton displayed in the application.
/// Navigates back when is pressed.
/// {@endtemplate}

class AppBackButton extends StatelessWidget {
  /// Creates a default instance of [AppBackButton].
  const AppBackButton({Key? key, onTap}) : this._(key: key, isLight: false, onTap: onTap);

  /// Creates a light instance of [AppBackButton].
  const AppBackButton.light({Key? key, onTap}) : this._(key: key, isLight: true, onTap: onTap);

  /// {@macro app_back_button}
  const AppBackButton._({super.key, required this.isLight, required this.onTap});

  /// Whether this app button is light.
  final bool isLight;

  final void Function() onTap;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: onTap,
      icon: Assets.icons.backIcon.svg(
        color: isLight ? AppColors.white : AppColors.highEmphasisSurface,
      ),
    );
  }
}
