import { motion } from "framer-motion";
import { Image } from "@chakra-ui/react";
import type { ColumnImage } from "@/types/column-images";

const spinAnimation = {
  spinning: {
    rotate: [0, 360],
    opacity: [1, 0.5, 0],
    transition: { 
      repeat: Infinity, 
      duration: 0.5, 
      ease: "linear" 
    }
  },
  stopped: {
    rotate: 0,
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: "linear" 
    }
  }
};

const blinkAnimation = {
  blink: {
    opacity: [1, 0.5, 1],
    transition: { 
      repeat: Infinity, 
      duration: 1, 
      ease: "easeInOut" 
    }
  },
  normal: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeInOut" 
    }
  }
};

const lineAnimation = {
  initial: { opacity: 0, pathLength: 0 },
  animate: { 
    opacity: 1,
    pathLength: 1,
    transition: { 
      duration: 1,
      ease: "easeInOut"
    }
  }
};

export const ImageColumn = ({ images, animate, animationKey, linesWithMatches, winningLineIndex }: ColumnImage) => {
  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => (
        <div
          key={`container-${index}`}
          className="w-32 h-32 bg-gray-200 flex items-center justify-center border border-gray-400 rounded relative"
        >
          {index === winningLineIndex && (
            <motion.svg
              className="absolute inset-0"
              initial="initial"
              animate="animate"
              variants={lineAnimation}
              width="100%"
              height="100%"
            >
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="yellow"
                strokeWidth="3"
              />
            </motion.svg>
          )}
          <motion.div
            key={`image-${index}-${animationKey}`}
            initial="stopped"
            animate={animate ? "spinning" : "stopped"}
            variants={spinAnimation}
            className={`flex items-center justify-center`}
          >
            {image && (
              <motion.div
                animate={linesWithMatches[index] ? "blink" : "normal"}
                variants={blinkAnimation}
              >
                <Image src={image.src} alt={image.alt} className={linesWithMatches[index] ? 'opacity-75' : ''} />
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
