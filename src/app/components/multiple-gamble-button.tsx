import { Button as ChakraButton } from '@chakra-ui/react';

interface MultipleGambleButtonProps {
  text: string | number
  onClick: () => void
  size: string
  isLoading: boolean
}

export const MultipleGambleButton = ({ onClick, size, text, isLoading }: MultipleGambleButtonProps) => {
  return (
    <ChakraButton isLoading={isLoading} onClick={onClick} className='flex bg-green-800 w-16 h-16 rounded-full' size={size}>
      {text}
    </ChakraButton>
  )
}