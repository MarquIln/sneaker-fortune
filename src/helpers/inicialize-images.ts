import type { Image } from "@/types/images";
import { shuffleArray } from "./shuffle-array";

export const initializeImages = (): { left: Image[], middle: Image[], right: Image[] } => {
  const shuffledImages = shuffleArray([...images, ...images, ...images]);
  return {
    left: shuffledImages.slice(0, 3),
    middle: shuffledImages.slice(3, 6),
    right: shuffledImages.slice(6, 9),
  };
};

export const images: Image[] = [
  { id: 1, src: "/mistery-box.png", alt: "Mistery Box", multiplier: 15 },
  { id: 2, src: "/panda.png", alt: "Panda", multiplier: 1.5 },
  { id: 3, src: "/vans.png", alt: "VANS", multiplier: 1 },
  { id: 4, src: "/lvtrainer.webp", alt: "LV Trainer", multiplier: 5 },
  { id: 5, src: "/havainas.webp", alt: "Havaianas", multiplier: 0.6 },
];
