import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { LinearTransition } from "react-native-reanimated";
import * as VideoThumbnails from "expo-video-thumbnails";

import UploadFile from "@/components/doc";
import "@/app/global.css";
import Entypo from "@expo/vector-icons/Entypo";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { FFmpegKitConfig } from "ffmpeg-kit-react-native";
import { useVideoContext } from "@/store";
import VideoItem from "@/components/VideoItem";
import { addMinToFileName } from "@/utils/addMinToFileName";
import { selectVideo } from "@/utils/ffmpeg";

export default function Index() {
  const { videos, addVideo } = useVideoContext();
  console.log(videos);
  const pickDocument = async () => {
    try {
      const [safReadUrl, thumbnail] = await selectVideo();
      if (safReadUrl && thumbnail) addVideo(safReadUrl, thumbnail);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="bg-black-soft flex-1 p-4">
      <ScrollView className="flex-1">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </ScrollView>
      <Animated.View
        style={{
          height: videos.length > 0 ? "auto" : "100%",
        }}
        layout={LinearTransition}
        className="w-fit flex items-center justify-center"
      >
        <CustomButton
          onPress={() => {
            pickDocument();
          }}
        >
          <Text className="text-text-1">ویدیو خود را اضافه کنید</Text>
          <Entypo name="plus" size={24} color="#fffff5db" />
        </CustomButton>
      </Animated.View>
    </SafeAreaView>
  );
}
