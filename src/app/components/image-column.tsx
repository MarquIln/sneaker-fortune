import { motion } from "framer-motion";
import { Image } from "@chakra-ui/react";
import type { ColumnImage } from "@/types/column-images";

const spinAnimation = {
  spinning: { rotate: 360, transition: { repeat: Infinity, duration: 0.15 } },
  stopped: { rotate: 0, transition: { duration: 0 } }
};

const blinkAnimation = {
  blink: {
    opacity: [1, 0.5, 1], 
    transition: { repeat: Infinity, duration: 1 } 
  },
  normal: { opacity: 1, transition: { duration: 0 } }
};

export const ImageColumn = ({ images, animate, animationKey, linesWithMatches }: ColumnImage) => {
  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => (
        <div
          key={`container-${index}`}
          className="w-32 h-32 bg-gray-200 flex items-center justify-center border border-gray-400 rounded"
        >
          <motion.div
            key={`image-${index}-${animationKey}`}
            initial="stopped"
            animate={animate ? "spinning" : "stopped"}
            variants={spinAnimation}
            className={`flex items-center justify-center ${linesWithMatches[index] ? 'filter hue-rotate-0 brightness-0 sepia-100 saturate-100' : ''}`}
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
