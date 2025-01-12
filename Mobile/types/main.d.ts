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
}
