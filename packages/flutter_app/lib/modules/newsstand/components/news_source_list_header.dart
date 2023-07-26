import 'package:flutter/material.dart';

class NewsSourceListHeader extends StatelessWidget {
  final String title;
  final Function onAdd;

  NewsSourceListHeader({required this.title, required this.onAdd});

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.only(left: 10, right: 0),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(title,
                  style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
              InkWell(
                  child: IconButton(
                      icon: Icon(Icons.add, color: Colors.grey[600]),
                      onPressed: () {}))
            ]));
  }
}
