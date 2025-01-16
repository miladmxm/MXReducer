export const convertLogTimeToNumber = (time: string): number => {
  try {
    return Number(time.replaceAll(":", ""));
  } catch (err) {
    console.log(err);
    return 1;
  }
};
