'use client'

import { useStore } from '@/context'
import { checkLines } from '@/helpers/check-lines'
import type { Image } from '@/types/images'
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { initializeImages } from '../../helpers/inicialize-images'
import { GambleButton } from './gamble-button'
import { ImageColumn } from './image-column'
import { MultipleGambleButton } from './multiple-gamble-button'
import { motion, useAnimation } from 'framer-motion'

export const GameBoard = () => {
  const {
    balance,
    increaseBalance,
    decreaseBalance,
    saveBalance,
    loadBalance,
    getActualBet,
    resetBalance,
  } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [multipleIsLoading, setMultipleIsLoading] = useState(false)
  const [shuffledImages, setShuffledImages] = useState(initializeImages())
  const [showMatches, setShowMatches] = useState<boolean[]>([])
  const [animate, setAnimate] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [winningLineIndex, setWinningLineIndex] = useState<number | null>(null)
  const [winnings, setWinnings] = useState(0)

  const { onOpen } = useDisclosure()

  const balanceAnimation = useAnimation()
  const winningsAnimation = useAnimation()

  useEffect(() => {
    loadBalance()
  }, [loadBalance])

  useEffect(() => {
    balanceAnimation.start({
      opacity: [0, 1],
      y: [-5, 0],
      transition: { duration: 0.1 },
    })
  }, [balance, balanceAnimation])

  useEffect(() => {
    winningsAnimation.start({
      opacity: [0, 1],
      y: [-5, 0],
      transition: { duration: 0.1 },
    })
  }, [winnings, winningsAnimation])

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const calculateWinnings = (matches: boolean[], imagesArray: Image[][]) => {
    return matches.reduce((totalWinnings, match, index) => {
      if (match) {
        let lineMultiplier = 1
        if (index < 3) {
          for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            lineMultiplier *= imagesArray[rowIndex][index].multiplier
          }
        } else if (index === 3) {
          for (let i = 0; i < 3; i++) {
            lineMultiplier *= imagesArray[i][i].multiplier
          }
        } else if (index === 4) {
          for (let i = 0; i < 3; i++) {
            lineMultiplier *= imagesArray[i][2 - i].multiplier
          }
        }
        totalWinnings += getActualBet() * lineMultiplier
      }
      return totalWinnings
    }, 0)
  }

  const handleGamble = async (rounds: number) => {
    if (balance <= 0) {
      console.log("You don't have enough balance to gamble")
      return
    }

    let totalWinnings = 0

    for (let i = 0; i < rounds; i++) {
      if (balance <= 0) break

      setIsLoading(rounds === 1)
      setMultipleIsLoading(rounds > 1)
      setAnimate(true)
      setAnimationKey(prevKey => prevKey + 1)

      await delay(500)

      const newImages = initializeImages()
      setShuffledImages(newImages)

      const imagesArray: Image[][] = [newImages.left, newImages.middle, newImages.right]
      const matches = checkLines(imagesArray)

      setShowMatches(Array(5).fill(false))
      setWinningLineIndex(matches.findIndex(match => match))

      await delay(200)

      setShowMatches(matches)

      if (matches.some(match => match)) {
        const winAmount = calculateWinnings(matches, imagesArray)
        totalWinnings += winAmount
        increaseBalance(winAmount)
      } else {
        decreaseBalance(getActualBet())
      }
      saveBalance()

      setAnimate(false)
      await delay(200)
    }

    setWinnings(totalWinnings)
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
            <GambleButton
              text="Another?"
              size="lg"
              onClick={() => handleGamble(1)}
              isLoading={isLoading}
            />
            <MultipleGambleButton
              text="auto"
              size="lg"
              onClick={onOpen}
              isLoading={multipleIsLoading}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex className="w-full justify-evenly border-2 border-blue-900 rounded-b-xl">
        <Flex className="gap-5">
          <motion.div
            animate={balanceAnimation}
          >
            <Text>Balance: {balance.toFixed(2)}</Text>
          </motion.div>
          <Text>Actual bet: {getActualBet()}</Text>
          <motion.div
            animate={winningsAnimation}
          >
            <Text>Winnings: {winnings}</Text>
          </motion.div>
        </Flex>
      </Flex>
    </Flex>
  )
}
