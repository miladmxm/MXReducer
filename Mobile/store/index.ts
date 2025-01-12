import { addMinToFileName } from "@/utils/addMinToFileName";
import { randomUUID } from "expo-crypto";
import { create } from "zustand";
export const useVideoContext = create<VideosContext>((set) => ({
  videos: [],
  addVideo: (sourceAddress, tumbnailAddress) => {
    set(({ videos }) => ({
      videos: [
        ...videos,
        {
          id: randomUUID(),
          sourceAddress,
          tumbnailAddress,
        },
      ],
    }));
  },
  setSaveAsUri: (id, saveInUri) => {
    set(({ videos }) => {
      const copyVideos = [...videos];
      const indexOfEditItem = copyVideos.findIndex((item) => item.id === id);
      copyVideos[indexOfEditItem].saveIn = saveInUri;
      return { videos: [...copyVideos] };
    });
  },
}));
