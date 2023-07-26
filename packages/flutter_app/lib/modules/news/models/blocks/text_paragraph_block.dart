import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

import 'blocks.dart';

part 'text_paragraph_block.g.dart';

/// {@template text_paragraph_block}
/// A block which represents a text paragraph.
/// https://www.figma.com/file/RajSN6YbRqTuqvdKYtij3b/Google-News-Template-App-v3?node-id=35%3A5007
/// {@endtemplate}
@JsonSerializable()
class TextParagraphBlock with EquatableMixin implements NewsBlock {
  /// {@macro text_paragraph_block}
  const TextParagraphBlock({
    required this.children,
    this.type = TextParagraphBlock.identifier,
  });

  /// Converts a `Map<String, dynamic>` into a [TextParagraphBlock] instance.
  factory TextParagraphBlock.fromJson(Map<String, dynamic> json) =>
      _$TextParagraphBlockFromJson(json);

  /// The text paragraph block type identifier.
  static const identifier = '__text_paragraph__';

  /// The text of the text paragraph.
  final List<NewsContentChild> children;

  @override
  final String type;

  @override
  Map<String, dynamic> toJson() => _$TextParagraphBlockToJson(this);

  @override
  List<Object?> get props => [children, type];
}

@JsonSerializable()
class NewsContentChild with EquatableMixin {
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

  const NewsContentChild({
    this.content,
    this.href,
    this.bold,
    this.italic,
    this.mark,
    this.markClass,
    this.strikethrough,
  });

  /// Converts a `Map<String, dynamic>` into a [NewsContentChildren] instance.
  factory NewsContentChild.fromJson(Map<String, dynamic> json) =>
      _$NewsContentChildFromJson(json);

  @override
  List<Object?> get props => [content, href, bold, italic, mark, markClass, strikethrough];
}
