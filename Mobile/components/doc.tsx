import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { FFmpegKit, FFmpegKitConfig } from "ffmpeg-kit-react-native";
import * as VideoThumbnails from "expo-video-thumbnails";

const UploadFile = () => {
  const [img, setImg] = useState<string>("");
  const pickDocument = async () => {
    FFmpegKitConfig.selectDocumentForRead("video/*").then(async (uri) => {
      const { uri: data } = await VideoThumbnails.getThumbnailAsync(uri, {
        time: 100,
      });
      console.log(data);
      setImg(data);

      // FFmpegKitConfig.getSafParameterForRead(uri).then((safReadUrl) => {
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
      // });
    });
  };

  return (
    <View>
      <Text className="text-center text-red-700">Upload CSV File</Text>
      <View>
        <TouchableOpacity>
          <Button
            title="upload your file"
            color="black"
            onPress={pickDocument}
          />
        </TouchableOpacity>
      </View>
      <Image width={100} height={100} source={{ uri: img }} />
    </View>
  );
};

export default UploadFile;
