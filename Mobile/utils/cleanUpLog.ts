export const cleanUpLog = (log: string): string => {
  let cleanLog = log.replaceAll("\n", "");
  cleanLog = cleanLog.replaceAll("\t", "");
  cleanLog = cleanLog.replaceAll(" ", "");
  return cleanLog;
};
