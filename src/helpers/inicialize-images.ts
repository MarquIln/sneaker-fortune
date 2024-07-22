import { shuffleArray } from "./shuffle-array";

export const initializeImages = () => ({
  left: shuffleArray(images.slice(0, 3)),
  middle: shuffleArray(images.slice(0, 3)),
  right: shuffleArray(images.slice(0, 3)),
});

export const images = [
  { src: "/mistery-box.png", alt: "Mistery Box" },
  { src: "/panda.png", alt: "Panda" },
  { src: "/vans.png", alt: "VANS" },
];
