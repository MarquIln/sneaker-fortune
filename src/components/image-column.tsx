import { motion } from 'framer-motion'
import { Image } from '@chakra-ui/react'
import type { ColumnImage } from '@/types/column-images'
import {
  blinkAnimation,
  lineAnimation,
  spinAnimation,
} from '@/helpers/animations'

const renderLine = (x1: string, y1: string, x2: string, y2: string) => (
  <motion.svg
    className="absolute inset-0"
    initial="initial"
    animate="animate"
    variants={lineAnimation}
    width="100%"
    height="100%"
  >
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="yellow" strokeWidth="2" />
  </motion.svg>
)

export const ImageColumn = ({
  images,
  animate,
  animationKey,
  linesWithMatches,
  columnIndex,
}: ColumnImage) => {
  const isMainDiagonal = linesWithMatches[3]
  const isAntiDiagonal = linesWithMatches[4]

  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => {
        const isHorizontalMatch = linesWithMatches[index]
        const isMainDiagonalMatch = isMainDiagonal && columnIndex === index
        const isAntiDiagonalMatch = isAntiDiagonal && columnIndex + index === 2

        return (
          <div
            key={`container-${index}`}
            className="w-32 h-32 bg-gray-200 flex items-center justify-center border border-gray-400 rounded relative"
          >
            {(isHorizontalMatch ||
              isMainDiagonalMatch ||
              isAntiDiagonalMatch) && (
              <>
                {isHorizontalMatch && renderLine('0%', '50%', '100%', '50%')}
                {isMainDiagonalMatch && renderLine('0%', '0%', '100%', '100%')}
                {isAntiDiagonalMatch && renderLine('100%', '0%', '0%', '100%')}
              </>
            )}

            <motion.div
              key={`image-${index}-${animationKey}`}
              initial="stopped"
              animate={animate ? 'spinning' : 'stopped'}
              variants={spinAnimation}
              className={`flex items-center justify-center`}
            >
              {image && (
                <motion.div
                  animate={
                    isHorizontalMatch ||
                    isMainDiagonalMatch ||
                    isAntiDiagonalMatch
                      ? 'blink'
                      : 'normal'
                  }
                  variants={blinkAnimation}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className={
                      isHorizontalMatch ||
                      isMainDiagonalMatch ||
                      isAntiDiagonalMatch
                        ? 'opacity-75'
                        : ''
                    }
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
