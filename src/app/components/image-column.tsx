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
  winningLineIndex,
  columnIndex,
}: ColumnImage) => {
  const isMainDiagonal = winningLineIndex === 3
  const isAntiDiagonal = winningLineIndex === 4

  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => (
        <div
          key={`container-${index}`}
          className="w-32 h-32 bg-gray-200 flex items-center justify-center border border-gray-400 rounded relative"
        >
          {index === winningLineIndex && renderLine('0%', '50%', '100%', '50%')}

          {isMainDiagonal &&
            columnIndex === index &&
            renderLine('0%', '0%', '100%', '100%')}

          {isAntiDiagonal &&
            columnIndex + index === 2 &&
            renderLine('100%', '0%', '0%', '100%')}

          <motion.div
            key={`image-${index}-${animationKey}`}
            initial="stopped"
            animate={animate ? 'spinning' : 'stopped'}
            variants={spinAnimation}
            className={`flex items-center justify-center`}
          >
            {image && (
              <motion.div
                animate={linesWithMatches[index] ? 'blink' : 'normal'}
                variants={blinkAnimation}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className={linesWithMatches[index] ? 'opacity-75' : ''}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
