'use client';

import { useCallback, useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useStore } from "@/context";
import { ImageColumn } from "./image-column";
import { GambleButton } from "./gamble-button";
import { initializeImages } from "../../helpers/inicialize-images";
import { checkLines } from "@/helpers/check-lines";
import { Select } from "./select";

export const GameBoard = () => {
  const { balance, increaseBalance, decreaseBalance, saveBalance, loadBalance, setBalance } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledImages, setShuffledImages] = useState(initializeImages());
  const [linesWithMatches, setLinesWithMatches] = useState<boolean[]>([]);
  const [animate, setAnimate] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [betValue, setBetValue] = useState(50);

  const imagesArray = [shuffledImages.left, shuffledImages.middle, shuffledImages.right];
  const matches = checkLines(imagesArray);

  const handleGamble = () => {
    if (balance <= 0) {
      console.log("You don't have enough balance to gamble");
      return;
    }

    if (!animate) {
      setAnimate(true);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    if (animate) {
      const timeoutId = setTimeout(() => {
        setShuffledImages(initializeImages());
        setAnimate(false);
        setAnimationKey((prevKey) => prevKey + 1);
        setIsLoading(false);

        setLinesWithMatches(matches);

        if (matches.some(match => match)) {
          increaseBalance(betValue * 2);
        } else {
          decreaseBalance(betValue); 
        }
        
        saveBalance();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [animate, shuffledImages, betValue, increaseBalance, decreaseBalance, saveBalance, matches]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const columns = [
    { images: shuffledImages.left, columnIndex: 0 },
    { images: shuffledImages.middle, columnIndex: 1 },
    { images: shuffledImages.right, columnIndex: 2 }
  ];

  return (
    <Flex className="flex-col w-full">
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
      <Flex className="flex-col p-5 items-center">
        <GambleButton text="Another?" size="lg" onClick={handleGamble} isLoading={isLoading} />
        <Flex className="flex-row gap-2 pt-5">
          <p>Balance: ${balance}</p>
          <p>Bet value: ${betValue}</p>
        </Flex>
        <Select />
      </Flex>
    </Flex>
  );
};
