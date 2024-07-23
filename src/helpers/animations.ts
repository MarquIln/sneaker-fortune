export const spinAnimation = {
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

export const blinkAnimation = {
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

export const lineAnimation = {
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