'use client'

import React, { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useStore } from '@/context'
import { initializeImages } from '../helpers/inicialize-images'
import { checkLines } from '@/helpers/check-lines'
import { CalculateWinnings } from '@/helpers/calculate-winnings'
import { GambleButton } from './gamble-button'
import { ImageColumn } from './image-column'
import { MultipleGambleButton } from './multiple-gamble-button'
import { motion, useAnimation } from 'framer-motion'
import { Popover } from './popover'
import type { Image } from '@/types/images'
import { Button } from './button'

export const GameBoard = () => {
  const {
    balance,
    increaseBalance,
    decreaseBalance,
    saveBalance,
    loadBalance,
    getActualBet,
  } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [multipleIsLoading, setMultipleIsLoading] = useState(false)
  const [shuffledImages, setShuffledImages] = useState(initializeImages())
  const [showMatches, setShowMatches] = useState<boolean[]>([])
  const [animate, setAnimate] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [winnings, setWinnings] = useState(0)
  const [, setBets] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const balanceAnimation = useAnimation()
  const winningsAnimation = useAnimation()

  const isBigWin = () => {
    return getActualBet() * 0.1 < winnings
  }

  const columns = [
    { images: shuffledImages.left, columnIndex: 0 },
    { images: shuffledImages.middle, columnIndex: 1 },
    { images: shuffledImages.right, columnIndex: 2 },
  ]

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

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const handleGamble = async (rounds: number) => {
    if (balance <= 0) {
      console.log("You don't have enough balance to gamble")
      return
    }

    setWinnings(0)

    let totalWinnings = 0

    for (let i = 0; i < rounds; i++) {
      if (balance <= 0) break

      setIsLoading(rounds === 1)
      setMultipleIsLoading(rounds > 1)
      setAnimate(true)
      setAnimationKey((prevKey) => prevKey + 1)

      await delay(200)

      const newImages = initializeImages()
      setShuffledImages(newImages)

      const imagesArray: Image[][] = [
        newImages.left,
        newImages.middle,
        newImages.right,
      ]
      const matches = checkLines(imagesArray)

      setShowMatches(Array(5).fill(false))

      await delay(200)

      setShowMatches(matches)

      if (matches.some((match) => match)) {
        const winAmount = CalculateWinnings(
          matches,
          imagesArray,
          getActualBet(),
        )
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

  const handleBetsChange = (newBets: number) => {
    setBets(newBets)
    handleGamble(newBets)
  }

  const animatedWinnings = useSpring({
    from: { value: 0 },
    to: { value: winnings },
    config: { duration: 1000 },
  })

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
              columnIndex={column.columnIndex}
            />
          </Box>
        ))}
        {isBigWin() && (
          <Flex className="absolute inset-0 justify-center items-center flex-col">
            <Text className="p-4 rounded-lg text-white font-bold text-5xl">
              BIG WIN
            </Text>
            <animated.div>
              <animated.text className="p-4 rounded-lg text-white font-bold text-5xl">
                {animatedWinnings.value.to((n) => n.toFixed(2))}
              </animated.text>
            </animated.div>
          </Flex>
        )}
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
          <Popover
            isOpen={isOpen}
            onClose={onClose}
            onBetsChange={handleBetsChange}
          />
        </Flex>
      </Flex>
      <Flex className="w-full justify-evenly border-2 border-blue-900 rounded-b-xl">
        <Flex className="gap-5">
          <motion.div animate={balanceAnimation}>
            <Text>Balance: {balance.toFixed(2)}</Text>
          </motion.div>
          <Text>Actual bet: {getActualBet()}</Text>
          <motion.div animate={winningsAnimation}>
            <Text>Winnings: {winnings}</Text>
          </motion.div>
        </Flex>
      </Flex>
      <Flex>
        <Button
          text={'Start Bonus!'}
          onClick={() => console.log('oi')}
          size="xs"
        />
      </Flex>
    </Flex>
  )
}
