export const getVideoFormat = (sourceAddress: string): VideoFomats => {
  const sourceFormatSplited = sourceAddress.split(".");
  return sourceFormatSplited[sourceFormatSplited.length - 1] as VideoFomats;
};
