import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_custom_tabs/flutter_custom_tabs.dart';
import 'package:news_aggregator/modules/news/news.module.dart';
import 'package:transparent_image/transparent_image.dart';

class ArticleContentList extends StatelessWidget {
  final List<NewsContentChildren> newsContentChildrenList;

  const ArticleContentList(this.newsContentChildrenList, {super.key});

  @override
  Widget build(BuildContext context) {
    return SliverList(
      delegate: SliverChildListDelegate(
        List<Widget>.generate(newsContentChildrenList.length, (int index) {
          return Container(
              padding: const EdgeInsets.all(10.0),
              child: ArticleContentListItem(newsContentChildrenList[index]));
        }),
      ),
    );
  }
}

class ArticleContentListItem extends StatelessWidget {
  final NewsContentChildren newsContentChildren;

  const ArticleContentListItem(this.newsContentChildren, {super.key});

  @override
  Widget build(BuildContext context) {
    switch (this.newsContentChildren.type) {
      case ArticleJsonChildType.blockquote:
        {
          return generateTextSpanList(this.newsContentChildren.children![0]);
        }
      case ArticleJsonChildType.embed:
        {
          return generateEmbed(this.newsContentChildren, context);
        }
      case ArticleJsonChildType.header1:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      case ArticleJsonChildType.header2:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      case ArticleJsonChildType.header3:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      case ArticleJsonChildType.header4:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      case ArticleJsonChildType.header5:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      case ArticleJsonChildType.header6:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      case ArticleJsonChildType.paragraph:
        {
          return generateTextSpanList(this.newsContentChildren);
        }
      default:
        {
          return const SizedBox();
        }
    }
  }
}

generateTextSpanList(NewsContentChildren newsContentChildren) {
  return Text.rich(
    TextSpan(
      children: List<TextSpan>.generate(newsContentChildren.children!.length,
          (int index) {
        return getTextSpanList(
            newsContentChildren.children![index], newsContentChildren.type);
      }),
    ),
  );
}

getTextSpanList(NewsContentChildren children, ArticleJsonChildType parentType) {
  print('children type: ' + children.type.toString());

  var fontSize = 16.0;
  var fontStyle = children.italic! ? FontStyle.italic : FontStyle.normal;
  var fontWeight = children.bold! ? FontWeight.bold : FontWeight.normal;
  var textDecoration = TextDecoration.none;
  var color = Colors.grey[900];

//  if (children.type == ArticleJsonChildType.paragraph) {
//    return TextSpan(children: [generateTextSpanList(children)]);
//  }

  final type = parentType != null ? parentType : children.type;
  switch (type) {
    case ArticleJsonChildType.header1:
      {
        fontSize = 24.0;
        fontWeight = FontWeight.bold;
        break;
      }
    case ArticleJsonChildType.header2:
      {
        fontSize = 22.0;
        fontWeight = FontWeight.bold;
        break;
      }
    case ArticleJsonChildType.header3:
      {
        fontSize = 20.0;
        fontWeight = FontWeight.bold;
        break;
      }
    case ArticleJsonChildType.header4:
      {
        fontSize = 18.0;
        fontWeight = FontWeight.bold;
        break;
      }
    case ArticleJsonChildType.header5:
      {
        fontWeight = FontWeight.bold;
        break;
      }
    case ArticleJsonChildType.header6:
      {
        fontSize = 14.0;
        fontWeight = FontWeight.bold;
        break;
      }
    default:
      {}
  }
  if (children.type == ArticleJsonChildType.linebreak) {
    return const TextSpan(text: "\n");
  }

  final recognizer = TapGestureRecognizer()
    ..onTap = () {
      openUrl(children.href!);
    };

  if (children.href != null) {
    textDecoration = TextDecoration.underline;
    color = Colors.lightBlue[500];
  }

  return TextSpan(
      text: children.content,
      recognizer: children.href != null ? recognizer : null,
      style: TextStyle(
          color: color,
          decoration: textDecoration,
          fontSize: fontSize,
          fontStyle: fontStyle,
          fontWeight: fontWeight));
}

generateEmbed(NewsContentChildren newsContentChildren, context) {
  print('generateEmbed: ${newsContentChildren.embedType}');
  print(newsContentChildren.toJson());
  if (newsContentChildren.src == null) {
    return const SizedBox();
  } else {
    switch (newsContentChildren.embedType) {
      case ArticleJsonEmbedType.image:
        {
          var imageWidth = newsContentChildren.width ?? 400;
          var imageHeight = newsContentChildren.height ?? 200;
          var imageAspectRatio = imageWidth / imageHeight;
          var screenWidth = MediaQuery.of(context).size.width;
          return ClipRRect(
            borderRadius: BorderRadius.circular(5),
            child: FadeInImage.memoryNetwork(
              height: screenWidth / imageAspectRatio,
              width: screenWidth,
              placeholder: kTransparentImage,
              image: newsContentChildren.src!,
              fit: BoxFit.cover,
            ),
          );
        }
      default:
        return const SizedBox();
    }
  }
}

void openUrl(String url) async {
  try {
    await launch(
      url,
      customTabsOption: CustomTabsOption(
        toolbarColor: Colors.grey[900],
        enableDefaultShare: true,
        enableUrlBarHiding: true,
        showPageTitle: true,
        animation: CustomTabsSystemAnimation.slideIn(),
      ),
    );
  } catch (e) {
    // An exception is thrown if browser app is not installed on Android device.
    debugPrint(e.toString());
  }
}
