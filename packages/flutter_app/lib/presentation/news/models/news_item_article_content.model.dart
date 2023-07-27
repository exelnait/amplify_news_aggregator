import 'package:json_annotation/json_annotation.dart';

part 'news_item_article_content.model.g.dart';

@JsonSerializable()
class NewsContentChildrenList {
  List<NewsContentChildren> data;

  NewsContentChildrenList({required this.data});

  factory NewsContentChildrenList.fromJson(Map<String, dynamic> json) =>
      _$NewsContentChildrenListFromJson(json);

  Map<String, dynamic> toJson() => _$NewsContentChildrenListToJson(this);
}

@JsonSerializable()
class NewsContentChildrenText {
  final String? content;
  @JsonKey(name: 'href')
  final String? href;
  @JsonKey(name: 'bold', defaultValue: false)
  final bool? bold;
  @JsonKey(name: 'italic', defaultValue: false)
  final bool? italic;
  final bool? mark;
  @JsonKey(name: 'markClass')
  final String? markClass;
  final bool? strikethrough;

  NewsContentChildrenText(this.content, this.href, this.bold, this.italic, this.mark, this.markClass, this.strikethrough);


  factory NewsContentChildrenText.fromJson(Map<String, dynamic> json) =>
      _$NewsContentChildrenTextFromJson(json);

  Map<String, dynamic> toJson() => _$NewsContentChildrenTextToJson(this);
}

@JsonSerializable()
class NewsContentChildren {
  final ArticleJsonChildType type;
  final List<NewsContentChildren>? children;

  // Text
  final String? content;
  @JsonKey(name: 'href')
  final String? href;
  @JsonKey(name: 'bold', defaultValue: false)
  final bool? bold;
  @JsonKey(name: 'italic', defaultValue: false)
  final bool? italic;
  final bool? mark;
  @JsonKey(name: 'markClass')
  final String? markClass;
  final bool? strikethrough;

  // Embed
  final ArticleJsonEmbedType? embedType;
  final List<NewsContentChildren>? caption;
  final List<dynamic>? attribution;
  final int? width;
  final int? height;
  final bool? secure;
  final String? src;
  final String? headline;
  final String? url;
  final String? date;
  // final String? user;
  final String? id;
  final List<NewsContentChildrenText>? text;
  final String? embedAs;
  final String? youtubeId;

  // BlockQuote
  final bool? pullQuote;

  NewsContentChildren(
      {required this.type,
      this.children,
      this.content,
      this.href,
      this.bold,
      this.italic,
      this.mark,
      this.markClass,
      this.strikethrough,
      this.embedType,
      this.caption,
      this.attribution,
      this.width,
      this.height,
      this.secure,
      this.src,
      this.headline,
      this.url,
      this.date,
      // this.user,
      this.id,
      this.text,
      this.embedAs,
      this.youtubeId,
      this.pullQuote});

  factory NewsContentChildren.fromJson(Map<String, dynamic> json) =>
      _$NewsContentChildrenFromJson(json);

  Map<String, dynamic> toJson() => _$NewsContentChildrenToJson(this);
}

enum ArticleJsonChildType {
  paragraph,
  text,
  linebreak,
  embed,
  blockquote,
  header1,
  header2,
  header3,
  header4,
  header5,
  header6
}

enum ArticleJsonEmbedType {
  custom,
  image,
  facebook,
  instagram,
  twitter,
  youtube,
  video
}
