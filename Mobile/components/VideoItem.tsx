import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { FFmpegKit, FFmpegKitConfig } from "ffmpeg-kit-react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { saveAsVideo, startProcess } from "@/utils/ffmpeg";
import { useVideoContext } from "@/store";
import { getVideoFormat } from "@/utils/getVideoFormat";
import { cleanUpLog } from "@/utils/cleanUpLog";
import { findTimeFromLog } from "@/utils/findTimeFromLog";
import { convertLogTimeToNumber } from "@/utils/convertLogTimeToNumber";

const _layout = LinearTransition.springify().damping(15);
const _entering = FadeInDown.springify().damping(15);
const _exiting = FadeOutDown.springify().damping(15);

const VideoItem = ({ video }: { video: Videos }) => {
  const { setSaveAsUri, removeVideo } = useVideoContext();
  const ffmpegSessionIdRef = useRef<number>();
  const [crf, setCrf] = useState<number>(22);
  const [processStatus, setProcessStatus] = useState<StatusType>("pause");
  const [durationTime, setDurationTime] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [format, setFormat] = useState<VideoFomats>(
    getVideoFormat(video.sourceAddress)
  );
  const cancleAndRemoveVideo = () => {
    if (ffmpegSessionIdRef.current) {
      FFmpegKit.cancel(ffmpegSessionIdRef.current);
    }
    removeVideo(video.id);
  };
  const handleSaveAs = async () => {
    try {
      const saveAsUri = await saveAsVideo(
        "Video name",
        format === "mkv" ? "video/x-matroska" : "video/mp4"
      );
      if (saveAsUri) {
        setSaveAsUri(video.id, saveAsUri);
        handleProcess();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProcess = () => {
    startProcess(
      { input: video.sourceAddress, output: video.saveIn!, crf: "22" },
      (session) => {
        const sessionId = session.getSessionId();
        ffmpegSessionIdRef.current = sessionId;
        setProcessStatus("doing");
      },
      async (log) => {
        const currentLog = cleanUpLog(log.getMessage() as string);
        const progressTime = findTimeFromLog(currentLog, "time=");
        if (progressTime) {
          setProgress(convertLogTimeToNumber(progressTime));
        } else {
          const session = await FFmpegKitConfig.getSession(log.getSessionId());
          let allLogs = cleanUpLog(await session.getAllLogsAsString());
          const duration = findTimeFromLog(allLogs, "Duration:");
          if (duration) {
            setDurationTime(convertLogTimeToNumber(duration));
          }
        }
      },
      () => {
        setProcessStatus("done");
      }
    );
  };
  return (
    <Animated.View
      style={{
        direction: "rtl",
      }}
      layout={_layout}
      exiting={_exiting}
      entering={_entering}
      className={`border rounded-2xl border-text-3 p-2 mb-3`}
    >
      <View
        className={
          processStatus === "done" ? "pointer-events-none opacity-40" : ""
        }
      >
        <Image
          source={{ uri: video.tumbnailAddress }}
          className="w-full aspect-video rounded-xl mb-4"
        />
        <View className="flex mb-4 flex-row items-center">
          <Text className="text-text-1 flex-auto">ضریب نرخ ثابت(CRF):</Text>
          <TextInput
            keyboardType="numeric"
            value={String(crf)}
            onChangeText={(e) => {
              if (processStatus === "pause") {
                setCrf(Number(e));
              }
            }}
            className={`
            outline-none border-none bg-transparent border-2 p-1 w-20 rounded text-center text-text-1
            ${crf === 0 || crf > 51 ? "border-red-400" : crf > 17 && crf < 29 ? "border-green-400" : "border-blue-400"}
            `}
          />
        </View>
        <View className="flex items-center gap-2 mb-4 flex-row">
          <Text className="text-text-1 text-left flex-1">فرمت خروجی:</Text>
          <View className="flex flex-row items-center justify-end gap-2 relative">
            <TouchableOpacity
              onPress={() => {
                if (processStatus === "pause") {
                  setFormat("mp4");
                }
              }}
              className={`px-2 opacity-60 border-2 border-green-200 transition-all py-1 ${format === "mp4" ? "bg-green-600" : "bg-black"} rounded-md`}
            >
              <Text className="text-text-1">MP4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (processStatus === "pause") {
                  setFormat("mkv");
                }
              }}
              className={`px-2 opacity-60 border-2 border-green-200 transition-all py-1 ${format === "mkv" ? "bg-green-600" : "bg-black"} rounded-md`}
            >
              <Text className="text-text-1">MKV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex flex-row gap-4 items-center justify-end">
        {processStatus === "pause" && (
          <>
            <TouchableOpacity
              onPress={handleSaveAs}
              className="p-2 w-16 rounded-lg bg-green-400 flex items-center justify-center"
            >
              <FontAwesome5 name="play" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                removeVideo(video.id);
              }}
              className="p-2 w-16 rounded-lg bg-red-400 flex items-center justify-center"
            >
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
        {processStatus === "doing" && (
          <>
            <View className="flex-1 h-1 rounded-full bg-gray-300/45 flex justify-center mx-4">
              <Animated.View
                layout={LinearTransition}
                className="h-1 bg-blue-400 w-max rounded-full relative"
                style={{
                  width: `${(progress * 100) / durationTime}%`,
                }}
              >
                <Animated.Text
                  layout={LinearTransition}
                  className="absolute left-full -translate-y-1/2 text-text-1 min-w-max"
                >
                  {((progress * 100) / durationTime).toFixed()}%
                </Animated.Text>
              </Animated.View>
            </View>
            <TouchableOpacity
              onPress={cancleAndRemoveVideo}
              className="p-2 w-16 rounded-lg bg-red-400 flex items-center justify-center"
            >
              <FontAwesome5 name="pause" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
        {processStatus === "done" && (
          <TouchableOpacity
            onPress={() => removeVideo(video.id)}
            className="bg-green-400 w-full flex flex-row gap-2 items-center justify-center py-2 rounded-lg"
          >
            <Text className="text-center text-text-1">انجام شد</Text>
            <MaterialIcons name="done-all" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default VideoItem;
