import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:multiple_stream_builder/multiple_stream_builder.dart';

class PodcastPlayerDurationSlider extends StatelessWidget {
  const PodcastPlayerDurationSlider({
    Key? key,
    required this.audioPlayer,
  }) : super(key: key);

  final AudioPlayer audioPlayer;

  @override
  Widget build(BuildContext context) {
    return StreamBuilder2<Duration?, Duration?>(
        streams: StreamTuple2(audioPlayer.positionStream, audioPlayer.durationStream),
        builder: (context, snapshots) {
          var position = snapshots.snapshot1.data ?? Duration.zero;
          var duration = snapshots.snapshot2.data ?? Duration.zero;
          var durationRemaining = Duration(seconds: duration.inSeconds - position.inSeconds);
          String sPosition = "${position.inHours > 0 ? "${position.inHours}:": ""}${position.inMinutes.remainder(60)}:${(position.inSeconds.remainder(60))}";
          String sDurationRemaining = "${durationRemaining.inHours > 0 ? "${durationRemaining.inHours}:": ""}${durationRemaining.inMinutes.remainder(60)}:${(durationRemaining.inSeconds.remainder(60))}";
          return Column(
            children: [
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                    activeTrackColor: Colors.white,
                    inactiveTrackColor: Colors.white.withAlpha(30),
                    thumbColor: Colors.white,
                    trackHeight: 4,
                    trackShape: CustomTrackShape(),
                    overlayShape: SliderComponentShape.noOverlay),
                child: Slider(
                  value: position.inSeconds.toDouble(),
                  min: 0,
                  max: duration.inSeconds.toDouble(),
                  onChanged: (value) {
                    audioPlayer.seek(Duration(seconds: value.toInt()));
                  },
                ),
              ),
              const SizedBox(height: 5),
              Row(
                children: [
                  Text(sPosition,
                      style: const TextStyle(
                          color: Color(0xffc3bfb9),
                          fontWeight: FontWeight.w300,
                          fontStyle: FontStyle.normal,
                          fontSize: 13.0),
                      textAlign: TextAlign.left),
                  const Expanded(child: SizedBox()),
                  Text("-$sDurationRemaining",
                      style: const TextStyle(
                          color: Color(0xffc3bfb9),
                          fontWeight: FontWeight.w300,
                          fontStyle: FontStyle.normal,
                          fontSize: 13.0),
                      textAlign: TextAlign.left)
                ],
              )
            ],
          );
        }
    );
  }
}

class CustomTrackShape extends RoundedRectSliderTrackShape {
  @override
  Rect getPreferredRect({
    required RenderBox parentBox,
    Offset offset = Offset.zero,
    required SliderThemeData sliderTheme,
    bool isEnabled = false,
    bool isDiscrete = false,
  }) {
    final double? trackHeight = sliderTheme.trackHeight;
    final double trackLeft = offset.dx;
    final double trackTop =
        offset.dy + (parentBox.size.height - trackHeight!) / 2;
    final double trackWidth = parentBox.size.width;
    return Rect.fromLTWH(trackLeft, trackTop, trackWidth, trackHeight);
  }
}