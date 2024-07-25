import type { Image } from './images'

export interface ColumnImage {
  images: Array<Image>
  animate: boolean
  animationKey: number
  linesWithMatches: boolean[]
  columnIndex: number
}
