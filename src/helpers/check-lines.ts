import type { Image } from "@/types/images";

export const checkLines = (imagesArray: Image[][]): boolean[] => {
  const result: boolean[] = [false, false, false, false, false];

  for (let i = 0; i < imagesArray[0].length; i++) {
    if (
      imagesArray[0][i].id === imagesArray[1][i].id &&
      imagesArray[1][i].id === imagesArray[2][i].id
    ) {
      result[i] = true;
    }
  }

  if (
    imagesArray[0][0].id === imagesArray[1][1].id &&
    imagesArray[1][1].id === imagesArray[2][2].id
  ) {
    result[3] = true;
  }

  if (
    imagesArray[0][2].id === imagesArray[1][1].id &&
    imagesArray[1][1].id === imagesArray[2][0].id
  ) {
    result[4] = true;
  }

  return result;
};
