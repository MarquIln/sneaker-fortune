export const checkLines = (imagesArray: { src: string; alt: string }[][]) => {
  const result: boolean[] = [false, false, false]; 

  for (let i = 0; i < 3; i++) {
    const imgLeft = imagesArray[0][i];
    const imgMiddle = imagesArray[1][i];
    const imgRight = imagesArray[2][i];

    if (imgLeft.src === imgMiddle.src && imgMiddle.src === imgRight.src) {
      result[i] = true; 
    }
  }

  
  const leftDiagonal = [imagesArray[0][0], imagesArray[1][1], imagesArray[2][2]];
  const rightDiagonal = [imagesArray[0][2], imagesArray[1][1], imagesArray[2][0]];

  if (leftDiagonal[0].src === leftDiagonal[1].src && leftDiagonal[1].src === leftDiagonal[2].src) {
    result.push(true); 
    console.log("leftDiagonal", result);
  }

  if (rightDiagonal[0].src === rightDiagonal[1].src && rightDiagonal[1].src === rightDiagonal[2].src) {
    result.push(true); 
    console.log("rightDiagonal", result);
  }

  return result;
};
