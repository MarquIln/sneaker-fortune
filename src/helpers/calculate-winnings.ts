import type { Image } from '@/types/images'

const allImagesEqual = (imagesArray: Image[][]) => {
  const firstImage = imagesArray[0][0].id
  return imagesArray.flat().every((img) => img.id === firstImage)
}

export const CalculateWinnings = (
  matches: boolean[],
  imagesArray: Image[][],
  actualBet: number,
) => {
  let totalWinnings = 0
  const baseMultiplier = 10

  const allEqual = allImagesEqual(imagesArray)

  totalWinnings = matches.reduce((sum, match, index) => {
    if (match) {
      let lineMultiplier = 1

      if (index < 3) {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
          lineMultiplier = imagesArray[rowIndex][index].multiplier
        }
      } else if (index === 3) {
        for (let i = 0; i < 3; i++) {
          lineMultiplier = imagesArray[i][i].multiplier
        }
      } else if (index === 4) {
        for (let i = 0; i < 3; i++) {
          lineMultiplier = imagesArray[i][2 - i].multiplier
        }
      }

      const roundWinnings = actualBet * lineMultiplier
      sum += roundWinnings
    }
    return sum
  }, 0)

  return allEqual ? totalWinnings * baseMultiplier : totalWinnings
}
