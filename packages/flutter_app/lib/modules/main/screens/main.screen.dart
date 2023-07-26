import 'package:beamer/beamer.dart';
import 'package:flutter/material.dart';

import 'package:news_aggregator/modules/home_feed/home_feed.module.dart';
import 'package:news_aggregator/modules/newsstand/newsstand.module.dart';

const PUBLISHER_ID = '8f743c6c-df91-49d0-adfc-ed3d9d7a7701';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          NewsStandScreen(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        items: const [
          BottomNavigationBarItem(label: 'Feed', icon: Icon(Icons.newspaper)),
          BottomNavigationBarItem(
              label: 'Search', icon: Icon(Icons.search)),
        ],
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
          Beamer.of(context).beamToNamed(
            index == 0 ? '/feed' : index == 1 ?  '/headlines' : '/newsstand',
          );
        },
      ),
    );
  }
}
