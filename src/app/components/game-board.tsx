'use client'

import { useStore } from "@/context"
import { checkLines } from "@/helpers/check-lines"
import type { Image } from "@/types/images"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { initializeImages } from "../../helpers/inicialize-images"
import { GambleButton } from "./gamble-button"
import { ImageColumn } from "./image-column"
import { MultipleGambleButton } from "./multiple-gamble-button"

export const GameBoard = () => {
  const { balance, increaseBalance, decreaseBalance, saveBalance, loadBalance, actualBet, getActualBet, setNumRounds, numRounds } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [multipleIsLoading, setMultipleIsLoading] = useState(false)
  const [shuffledImages, setShuffledImages] = useState(initializeImages())
  const [showMatches, setShowMatches] = useState<boolean[]>([])
  const [animate, setAnimate] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [winningLineIndex, setWinningLineIndex] = useState<number | null>(null)

  useEffect(() => {
    loadBalance()
  }, [loadBalance])

  const handleRoundsChange = (selectedRounds: number) => {
    setNumRounds(selectedRounds)
  }

  const handleGamble = async (rounds: number) => {
    if (balance <= 0) {
      console.log("You don't have enough balance to gamble")
      return
    }

    for (let i = 0; i < rounds; i++) {
      if (balance <= 0) break;

      if (rounds > 1) {
        setMultipleIsLoading(true)
      } else {
        setIsLoading(true)
      }

      setAnimate(true)
      setAnimationKey((prevKey) => prevKey + 1);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const newImages = initializeImages()
      setShuffledImages(newImages)

      const imagesArray: Image[][] = [newImages.left, newImages.middle, newImages.right]
      const matches = checkLines(imagesArray)

      setShowMatches(Array(5).fill(false))

      const winningLineIndex = matches.findIndex(match => match);
      setWinningLineIndex(winningLineIndex);

      await new Promise((resolve) => setTimeout(resolve, 200));

      setShowMatches(matches)

      if (matches.some((match) => match)) {
        increaseBalance(getActualBet() * imagesArray.flat()[0].multiplier)
      } else {
        decreaseBalance(getActualBet())
      }
      saveBalance()

      setAnimate(false)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setIsLoading(false)
    setMultipleIsLoading(false)
  }

  const columns = [
    { images: shuffledImages.left, columnIndex: 0 },
    { images: shuffledImages.middle, columnIndex: 1 },
    { images: shuffledImages.right, columnIndex: 2 },
  ]

  return (
    <Flex className="flex-col w-full bg-blue-500 items-center rounded-xl">
      <Flex className="grid grid-cols-3 gap-4 items-start relative">
        {columns.map((column, index) => (
          <Box key={index} position="relative" w="full">
            <ImageColumn
              images={column.images}
              animate={animate}
              animationKey={animationKey}
              linesWithMatches={showMatches}
              winningLineIndex={winningLineIndex}
              columnIndex={column.columnIndex}
            />
          </Box>
        ))}
      </Flex>
      <Flex className="flex-col p-5 items-center w-full">
        <Flex className="gap-5 mb-4">
          <Flex className="gap-5">
            <GambleButton text="Another?" size="lg" onClick={() => handleGamble(1)} isLoading={isLoading} />
            <MultipleGambleButton text="auto" size="lg" onClick={() => handleGamble(numRounds)} isLoading={multipleIsLoading} onOpen={() => console.log('a')} />
          </Flex>
        </Flex>
      </Flex>
      <Flex className="">
        <Flex className="justify-evenly gap-4">
          <Text>
            Balance: {balance}
          </Text>
          <Text>
            Actual bet: {getActualBet()}
          </Text>
          <Text>
            Rounds: {numRounds}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
