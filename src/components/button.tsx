import { Button as ChakraButton } from '@chakra-ui/react'

interface ButtonProps {
  text: string | number
  onClick: () => void
  size: string
  isLoading?: boolean
}

export const Button = ({ text, onClick, size, isLoading }: ButtonProps) => {
  return (
    <ChakraButton
      isLoading={isLoading}
      onClick={onClick}
      className="flex bg-blue-900 w-16 h-16 rounded-full"
      size={size}
    >
      {text}
    </ChakraButton>
  )
}
