import { Flex, Text } from '@chakra-ui/react';
import { GameBoard } from '../components/game-board';

export default function Game() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <Text className="text-4xl font-bold mb-8">Sneaker Fortune</Text>
      <Flex className='pt-14'>
        <GameBoard />
      </Flex>
    </div>
  );
}
