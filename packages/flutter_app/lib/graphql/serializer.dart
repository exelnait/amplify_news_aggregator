import 'dart:convert';

import 'package:built_value/serializer.dart';

class AWSTimestampSerializer implements PrimitiveSerializer<DateTime> {
  @override
  DateTime deserialize(
      Serializers serializers,
      Object serialized, {
        FullType specifiedType = FullType.unspecified,
      }) {
    assert(serialized is int,
    "DateSerializer expected 'int' but got ${serialized.runtimeType}");
    var duration = Duration(seconds: serialized as int);
    return DateTime.fromMillisecondsSinceEpoch(duration.inMilliseconds);
  }

  @override
  Object serialize(
      Serializers serializers,
      DateTime date, {
        FullType specifiedType = FullType.unspecified,
      }) =>
      date.millisecondsSinceEpoch;

  @override
  Iterable<Type> get types => [DateTime];

  @override
  String get wireName => 'AWSTimestamp';
}

class AWSDateTimeSerializer implements PrimitiveSerializer<DateTime> {
  @override
  DateTime deserialize(
      Serializers serializers,
      Object serialized, {
        FullType specifiedType = FullType.unspecified,
      }) {
    assert(serialized is String,
    "DateSerializer expected 'String' but got ${serialized.runtimeType}");
    return DateTime.parse(serialized as String);
  }

  @override
  String serialize(
      Serializers serializers,
      DateTime date, {
        FullType specifiedType = FullType.unspecified,
      }) {
    var isoDate =  date.toIso8601String();
    if (!isoDate.contains('Z')) {
      isoDate = isoDate + 'Z';
    }
    return isoDate;
  }

  @override
  Iterable<Type> get types => [DateTime];

  @override
  String get wireName => 'AWSDateTime';
}

class AWSJSONSerializer implements PrimitiveSerializer<Map<String, dynamic>> {
  @override
  Map<String, dynamic> deserialize(
      Serializers serializers,
      Object serialized, {
        FullType specifiedType = FullType.unspecified,
      }) {
    assert(serialized is String,
    "DateSerializer expected 'String' but got ${serialized.runtimeType}");
    return jsonDecode(serialized as String);
  }

  @override
  String serialize(
      Serializers serializers,
      Map<String, dynamic> json, {
        FullType specifiedType = FullType.unspecified,
      }) =>
      jsonEncode(json);

  @override
  Iterable<Type> get types => [Map];

  @override
  String get wireName => 'AWSJSON';
}