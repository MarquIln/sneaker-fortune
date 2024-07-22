import { Button as ChakraButton } from '@chakra-ui/react';

interface GambleButtonProps {
  text: string
  onClick: () => void
  size: string
  isLoading: boolean
}

export const GambleButton = ({ onClick, size, text, isLoading }: GambleButtonProps) => {
  return (
    <ChakraButton isLoading={isLoading} onClick={onClick} className='flex bg-green-800 w-20 h-16 rounded-full' size={size}>
      {text}
    </ChakraButton>
  )
}