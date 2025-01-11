import { randomUUID } from "expo-crypto";
import { create } from "zustand";
export const useVideoContext = create<VideosContext>((set) => ({
  videos: [],
  addVideo: (sourceAddress, tumbnailAddress) =>
    set(({ videos }) => ({
      videos: [
        ...videos,
        {
          id: randomUUID(),
          sourceAddress,
          tumbnailAddress,
          progress: 0,
          isPause: true,
        },
      ],
    })),
}));
