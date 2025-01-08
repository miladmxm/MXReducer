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
    <View style={styles.background}>
      <Text style={styles.file}>Upload CSV File</Text>
      <View style={styles.button}>
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

const styles = StyleSheet.create({
  background: {
    backgroundColor:
      "radial-gradient(ellipse at left bottom,    rgb(163, 237, 255) 0%,    rgba(57, 232, 255, 0.9) 59%,    rgba(48, 223, 214, 0.9) 100% )",
  },
  file: {
    color: "black",
    marginHorizontal: 145,
  },
  button: {
    marginHorizontal: 60,
  },
});

export default UploadFile;
