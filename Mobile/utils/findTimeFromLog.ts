export const findTimeFromLog = (log: string, searchFlag: string): string => {
  const indexOfDuration = log.indexOf(searchFlag);
  let time: string = "";

  if (indexOfDuration > -1) {
    time = log.slice(
      indexOfDuration + searchFlag.length,
      indexOfDuration + searchFlag.length + 8
    );
  }
  return time;
};
