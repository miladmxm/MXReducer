import {
  FFmpegKitConfig,
  FFmpegKit,
  FFmpegSession,
  LogCallback,
} from "ffmpeg-kit-react-native";
import { getThumbnailAsync } from "expo-video-thumbnails";

export const selectVideo = (): Promise<[string, string]> => {
  return new Promise((resolve, reject) => {
    FFmpegKitConfig.selectDocumentForRead("video/*")
      .then((uri) => {
        FFmpegKitConfig.getSafParameterForRead(uri).then(async (safReadUrl) => {
          const { uri: thumbnail } = await getThumbnailAsync(uri, {
            time: 100,
          });
          resolve([safReadUrl, thumbnail]);
        });
      })
      .catch(() => {
        reject("dos not selected");
      });
  });
};

export const saveAsVideo = (
  saveAsFileName: string = "video",
  format: "video/mp4" | "video/x-matroska" = "video/mp4"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    FFmpegKitConfig.selectDocumentForWrite(saveAsFileName, format).then(
      (uri) => {
        FFmpegKitConfig.getSafParameterForWrite(uri)
          .then((safUrl) => {
            resolve(safUrl);
          })
          .catch(() => {
            reject("dos not selected save as path");
          });
      }
    );
  });
};

export const startProcess = (
  { input, output, crf }: ProcessFFmpegOptions,
  onStart: (session: FFmpegSession) => void,
  onProcessLog: LogCallback,
  onEnd: () => void
) => {
  FFmpegKit.executeAsync(
    `-i ${input} -c:v libx265 -crf ${crf} ${output}`,
    onEnd,
    onProcessLog
  ).then(onStart);
};
