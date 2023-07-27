import 'package:flutter/material.dart';
import 'package:news_aggregator/data/publisher/publisher.data.dart';
import 'package:transparent_image/transparent_image.dart';


class NewsSourceListItem extends StatelessWidget {
  final PublisherModel newsSource;
  final Function(PublisherModel newsSource) onTap;

  NewsSourceListItem(
      {required this.newsSource,
      required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap: () {
          onTap(newsSource);
        },
        child: SizedBox(
            width: 110,
            child: Stack(children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Card(
                      child: ClipRRect(
                          borderRadius: BorderRadius.circular(5),
                          child: FadeInImage.memoryNetwork(
                            width: 100,
                            height: 100,
                            placeholder: kTransparentImage,
                            image: newsSource.thumbnail,
                            fit: BoxFit.cover,
                          ))),
                  const Padding(padding: EdgeInsets.only(top: 5, bottom: 5)),
                  Text(
                    newsSource.title,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 13),
                  )
                ],
              ),
            ])));
  }
}
