export function addMinToFileName(filename: string) {
  const arrayOfName = filename.split(".");
  arrayOfName[arrayOfName.length - 1] =
    "_min." + arrayOfName[arrayOfName.length - 1];
  return arrayOfName.join("");
}
