export const spinAnimation = {
  spinning: {
    y: [0, 100, 0], // Moves down and then resets to the original position
    opacity: [1, 0.5, 1],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      ease: 'linear',
    },
  },
  stopped: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'linear',
    },
  },
}

export const blinkAnimation = {
  blink: {
    opacity: [1, 0.5, 1],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'easeInOut',
    },
  },
  normal: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

export const lineAnimation = {
  initial: { opacity: 0, pathLength: 0 },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}
