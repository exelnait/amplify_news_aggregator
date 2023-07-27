import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';

class OpenVideoCover extends StatelessWidget {
  const OpenVideoCover({
    Key? key,
    required this.url, this.width, this.height, this.aspectRatio,
  }) : super(key: key);

  final String url;
  final double? width;
  final double? height;
  final double? aspectRatio;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
        aspectRatio: aspectRatio ?? 16/9,
        child: Hero(
            tag: url,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(5),
              child: FadeInImage.memoryNetwork(
                height: height ?? 200.0,
                width: width ?? MediaQuery.of(context).size.width,
                placeholder: kTransparentImage,
                image: url,
                fit: BoxFit.cover,
              ),
            )));
  }
}
