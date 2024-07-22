'use client';

import { useCallback, useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useStore } from "@/context";
import { ImageColumn } from "./image-column";
import { GambleButton } from "./gamble-button";
import { initializeImages } from "../../helpers/inicialize-images";
import { checkLines } from "@/helpers/check-lines";

export const GameBoard = () => {
  const { balance, increaseBalance, decreaseBalance, saveBalance, loadBalance, setBalance } = useStore();
  const [shuffledImages, setShuffledImages] = useState(initializeImages());
  const [linesWithMatches, setLinesWithMatches] = useState<boolean[]>([]);
  const [animate, setAnimate] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [betValue, setBetValue] = useState(100); 

  const changeBetValue = (value: number) => {
    setBetValue(value);
  }

  const handleGamble = (amount: number) => {
    if (balance <= 0) {
      console.log("You don't have enough balance to gamble");
      return;
    }

    if (!animate) {
      setAnimate(true);
    }

    setBalance(balance - amount);
    saveBalance();
  }

  const increaseBalanceBy = useCallback((amount: number) => {
    increaseBalance(amount);
    saveBalance();
  }, [increaseBalance, saveBalance]);

  useEffect(() => {
    const imagesArray = [shuffledImages.left, shuffledImages.middle, shuffledImages.right];
  
    const matches = checkLines(imagesArray);
  
    setLinesWithMatches(matches);
  
    if (matches.some(match => match)) {
      increaseBalanceBy(betValue);
    }
  }, [shuffledImages, betValue, increaseBalanceBy]);
  

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
        <GambleButton onClick={() => handleGamble(betValue)} />
        <Box mb="2">{balance}</Box>
        <Flex className="flex-col gap-2">
          <button onClick={() => increaseBalanceBy(100)}>Increase</button>
          <button onClick={() => decreaseBalanceBy(100)}>Decrease</button>
          <button onClick={() => setBalance(0)}>Reset</button>
          <button onClick={() => changeBetValue(100)}>Change bet value to $100</button>
        </Flex>
      </Flex>
    </Flex>
  );
};
