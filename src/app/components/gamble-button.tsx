import { useStore } from '@/context';
import { betValues } from '@/helpers/bet-values';
import { Button as ChakraButton, Flex } from '@chakra-ui/react';
import { TbPlayerPlayFilled } from "react-icons/tb"

interface GambleButtonProps {
  text: string | number
  onClick: () => void
  size: string
  isLoading: boolean
}

export const GambleButton = ({ onClick, size, text, isLoading }: GambleButtonProps) => {
  const { setActualBet, actualBet, getActualBet } = useStore();

  const handleIncrementBet = () => {
    if (actualBet < betValues.length - 1) {
      setActualBet(actualBet + 1);
    }
  };

  const handleDecrementBet = () => {
    if (actualBet > 0) {
      setActualBet(actualBet - 1);
    }
  };

  return (
    <Flex className='gap-2 items-center'>
      <ChakraButton className='bg-blue-500 w-10 h-10 rounded-full text-blue-900' onClick={handleDecrementBet}>
        -
      </ChakraButton>
      <ChakraButton isLoading={isLoading} onClick={onClick} className='flex bg-blue-900 w-16 h-16 rounded-full' size={size}>
        <TbPlayerPlayFilled size={42} color='blue' />
      </ChakraButton>
      <ChakraButton className='bg-blue-500 w-10 h-10 rounded-full text-blue-900' onClick={handleIncrementBet}>
        +
      </ChakraButton>
      {getActualBet()}
    </Flex>
  );
}
