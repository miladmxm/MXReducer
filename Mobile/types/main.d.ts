type Videos = {
  id: string;
  sourceAddress: string;
  tumbnailAddress: string;
  progress: number;
};
declare interface VideosContext {
  videos: Videos[];
  addVideo: (sourceAddress: string, thtumbnailAddress: string) => void;
}
