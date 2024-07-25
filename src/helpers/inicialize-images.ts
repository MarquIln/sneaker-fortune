import type { Image } from '@/types/images'
import { shuffleArray } from './shuffle-array'

const images: Image[] = [
  { id: 1, src: '/mistery-box.png', alt: 'Mistery Box', multiplier: 15 },
  { id: 2, src: '/panda.png', alt: 'Panda', multiplier: 1.5 },
  { id: 3, src: '/vans.png', alt: 'VANS', multiplier: 1 },
  { id: 4, src: '/lvtrainer.png', alt: 'LV Trainer', multiplier: 5 },
  { id: 5, src: '/havainas.webp', alt: 'Havaianas', multiplier: 0.6 },
  { id: 6, src: '/vans-flame.png', alt: 'VANS Flame', multiplier: 2 },
]

const generateWeightedImages = (images: Image[]): Image[] => {
  const weightedImages: Image[] = []
  const baseWeight = 10

  images.forEach(image => {
    const weight = Math.round(baseWeight / Math.log(image.multiplier + 1))
    for (let i = 0; i < weight; i++) {
      weightedImages.push(image)
    }
  })

  return weightedImages
}

export const initializeImages = (): {
  left: Image[]
  middle: Image[]
  right: Image[]
} => {
  const weightedImages = generateWeightedImages(images)
  const shuffledImages = shuffleArray([...weightedImages, ...weightedImages, ...weightedImages])
  return {
    left: shuffledImages.slice(0, 3),
    middle: shuffledImages.slice(3, 6),
    right: shuffledImages.slice(6, 9),
  }
}
