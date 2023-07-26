import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/modules/common/common.module.dart';

part 'topic.model.freezed.dart';
part 'topic.model.g.dart';

@freezed
class TopicModel with _$TopicModel {
  const factory TopicModel({
    required String id,
    required String title,
    String? domain,
  }) = _TopicModel;

  factory TopicModel.fromFragment(TopicFragment item) {
    return TopicModel(
      id: item.id,
      title: item.title,
    );
  }

  factory TopicModel.fromJson(Map<String, dynamic> json) =>
      _$TopicModelFromJson(json);
}
