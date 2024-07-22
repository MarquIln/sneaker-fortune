import type { ColumnImage } from "@/types/column-images";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const dropAnimation = {
  hidden: { y: -200, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  exit: { y: 200, opacity: 1, transition: { duration: 1 } }
};

export const ImageColumn = ({ images, animate, animationKey }: ColumnImage) => {
  return (
    <div className={`flex flex-col gap-4`}>
      {images.map((image, index) => (
        <div
          key={`container-${index}`}
          className="w-32 h-32 bg-gray-200 flex items-center justify-center border border-gray-400"
        >
          <motion.div
            key={`image-${index}-${animationKey}`}
            initial="hidden"
            animate={animate ? "hidden" : "visible"}
            exit="exit"
            variants={dropAnimation}
            className="w-full h-full flex items-center justify-center"
          >
            {image && (
              <Image src={image.src} alt={image.alt} />
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
