import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:news_aggregator/modules/news/news.module.dart';
import 'package:news_aggregator/modules/home_feed/home_feed.module.dart';

part 'publisher.model.freezed.dart';
part 'publisher.model.g.dart';

@freezed
class PublisherModel with _$PublisherModel {
  const factory PublisherModel({
    required String id,
    required String title,
    String? image,
    required String thumbnail,
    String? domain,
}) = _PublisherModel;

  factory PublisherModel.fromFragment(PublisherInfoFragment item) {
    String? domain;
    try {
      domain = item.sources?.items.firstWhere((source) => source?.type == SourceType.RSS)?.website?.url;
    } catch (e) {
      domain = null;
    }
    return PublisherModel(
      id: item.id,
      title: item.title,
      thumbnail: item.avatar.resized!.medium,
      domain: domain,
    );
  }

  factory PublisherModel.fromJson(Map<String, dynamic> json) =>
      _$PublisherModelFromJson(json);
}
