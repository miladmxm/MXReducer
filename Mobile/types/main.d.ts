type Videos = {
  id: string;
  sourceAddress: string;
  tumbnailAddress: string;
  saveIn?: string;
};
declare interface VideosContext {
  videos: Videos[];
  addVideo: (sourceAddress: string, thtumbnailAddress: string) => void;
  setSaveAsUri: (id: string, saveInUri: string) => void;
  removeVideo: (id: string) => void;
}

type VideoFomats = "mkv" | "mp4";
type StatusType = "pause" | "done" | "doing";

type ProcessFFmpegOptions = {
  input: string;
  output: string;
  crf: string;
};
