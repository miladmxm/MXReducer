import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FFmpegKit, FFmpegKitConfig } from "ffmpeg-kit-react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { saveAsVideo } from "@/utils/ffmpeg";
import { useVideoContext } from "@/store";

const VideoItem = ({ video }: { video: Videos }) => {
  const { setSaveAsUri } = useVideoContext();
  const [ffmpegSessionId, setFfmpegSessionId] = useState<number>();
  const [videoDuration, setVideoDuration] = useState<number>();
  console.log(videoDuration);
  const progressWidthStyle = useSharedValue(0);
  const progressStyle = useAnimatedStyle(() => ({
    width: withTiming(progressWidthStyle.value * 2),
  }));
  const handleSaveAs = async () => {
    try {
      const saveAsUri = await saveAsVideo();
      if (saveAsUri) setSaveAsUri(video.id, saveAsUri);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="border rounded-2xl border-text-3 p-2 mb-3" key={video.id}>
      <Image
        source={{ uri: video.tumbnailAddress }}
        className="w-full aspect-video rounded-xl mb-2"
      />
      {video.saveIn ? (
        <View>
          <Text>ذخیره در:</Text>
          <TouchableOpacity>
            <Text>{video.saveIn}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleSaveAs}
          className="p-3 bg-green-600 rounded-lg"
        >
          <Text className="text-white text-center">ذخیره در</Text>
        </TouchableOpacity>
      )}
      {video.saveIn && (
        <TouchableOpacity
          onPress={() => {
            FFmpegKit.executeAsync(
              `-i ${video.sourceAddress} -c:v libx265 -crf 28 ${video.saveIn} -y -stats`,
              () => {},
              (log) => {
                const logMessage = log.getMessage();
                console.log(logMessage);
                logMessage.indexOf("Duration:");

                const time = log.getMessage().indexOf("time=");

                if (time !== -1) {
                  console.log("my custom logs ::::::::", videoDuration, time);
                }
              }
            ).then(async (session) => {
              const sessionId = session.getSessionId();
              setFfmpegSessionId(sessionId);
            });
          }}
        >
          <Text>start</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="py-3 bg-red-400 "
        onPress={() => FFmpegKit.cancel(ffmpegSessionId)}
      >
        <Text>calcle</Text>
      </TouchableOpacity>

      <View className="w-full relative h-4 mt-5">
        <Animated.View
          className="h-2 bg-blue-600 absolute left-0 top-0"
          style={progressStyle}
        />
      </View>
    </View>
  );
};

export default VideoItem;
