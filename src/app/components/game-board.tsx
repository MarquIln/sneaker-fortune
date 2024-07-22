'use client';

import { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useStore } from "@/context";
import { ImageColumn } from "./image-column";
import { GambleButton } from "./gamble-button";
import { initializeImages } from "../../helpers/inicialize-images";
import { checkLines } from "@/helpers/check-lines";

export const GameBoard = () => {
  const { balance, increaseBalance, decreaseBalance, saveBalance, loadBalance } = useStore();
  const [shuffledImages, setShuffledImages] = useState(initializeImages());
  const [linesWithMatches, setLinesWithMatches] = useState<boolean[]>([]);
  const [animate, setAnimate] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleButtonClick = () => {
    if (!animate) {
      setAnimate(true);
    }
  };

  useEffect(() => {
    const imagesArray = [shuffledImages.left, shuffledImages.middle, shuffledImages.right];
    const matches = checkLines(imagesArray);
    setLinesWithMatches(matches);
  }, [shuffledImages]);

  useEffect(() => {
    loadBalance();
    
    if (animate) {
      const timeoutId = setTimeout(() => {
        setShuffledImages(initializeImages());
        setAnimate(false);
        setAnimationKey((prevKey) => prevKey + 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [animate, loadBalance]);

  const increaseBalanceBy = (amount: number) => {
    increaseBalance(amount);
    saveBalance();
  };

  const decreaseBalanceBy = (amount: number) => {
    decreaseBalance(amount);
    saveBalance();
  };

  const columns = [
    { images: shuffledImages.left, columnIndex: 0 },
    { images: shuffledImages.middle, columnIndex: 1 },
    { images: shuffledImages.right, columnIndex: 2 }
  ];

  return (
    <Flex direction="column" align="center" w="full">
      <Flex className="grid grid-cols-3 gap-4 items-start relative">
        {columns.map((column, index) => (
          <Box key={index} position="relative" w="full">
            <ImageColumn
              images={column.images}
              animate={animate}
              animationKey={animationKey}
            />
          </Box>
        ))}
      </Flex>
      <Flex direction="column" py="10">
        <GambleButton onClick={handleButtonClick} />
        <Box mb="2">{balance}</Box>
        <Flex>
          <button onClick={() => increaseBalanceBy(100)}>Increase</button>
          <button onClick={() => decreaseBalanceBy(100)}>Decrease</button>
        </Flex>
      </Flex>
    </Flex>
  );
};
