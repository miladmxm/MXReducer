import { FFmpegKitConfig, FFprobeKit } from "ffmpeg-kit-react-native";
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
  saveAsFileName?: string,
  format?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    FFmpegKitConfig.selectDocumentForWrite(
      saveAsFileName ?? "video",
      format ?? "video/mp4"
    ).then((uri) => {
      FFmpegKitConfig.getSafParameterForWrite(uri)
        .then((safUrl) => {
          resolve(safUrl);
        })
        .catch(() => {
          reject("dos not selected save as path");
        });
    });
  });
};

// FFmpegKit.executeWithArgumentsAsync([
//   "-i",
//   safReadUrl,
//   "-c:v",
//   'mpeg4',
//   safUrl,
// ]);
// FFmpegKit.executeAsync(
//   `-i ${safReadUrl} -c:v libx265 -crf 28 ${safUrl}`
// );
