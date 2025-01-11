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

export default function Index() {
  const { videos, addVideo } = useVideoContext();
  console.log(videos);
  const pickDocument = async () => {
    FFmpegKitConfig.selectDocumentForRead("video/*").then((uri) => {
      FFmpegKitConfig.getSafParameterForRead(uri).then(async (safReadUrl) => {
        const { uri: thumbnail } = await VideoThumbnails.getThumbnailAsync(
          uri,
          {
            time: 100,
          }
        );
        addVideo(safReadUrl, thumbnail);
        //   FFmpegKitConfig.selectDocumentForWrite("video.mp4", "video/*").then(
        //     (uri) => {
        //       // FFmpegKitConfig.getSafParameterForWrite(uri).then((safUrl) => {
        //       //   // FFmpegKit.executeWithArgumentsAsync([
        //       //   //   "-i",
        //       //   //   safReadUrl,
        //       //   //   "-c:v",
        //       //   //   'mpeg4',
        //       //   //   safUrl,
        //       //   // ]);
        //       //   // FFmpegKit.executeAsync(
        //       //   //   `-i ${safReadUrl} -c:v libx265 -crf 28 ${safUrl}`
        //       //   // );
        //       // });
        //     }
        //   );
      });
    });
  };

  return (
    <SafeAreaView className="bg-black-soft flex-1 p-4">
      <ScrollView className="flex-1">
        {videos.map((video) => (
          <View
            className="border rounded-2xl border-text-3 p-2 mb-3"
            key={video.id}
          >
            <Image
              source={{ uri: video.tumbnailAddress }}
              className="w-full aspect-video rounded-xl"
            />
          </View>
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
