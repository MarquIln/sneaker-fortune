import { Button as ChakraButton } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface MultipleGambleButtonProps {
  text: string | number
  onClick: () => void
  size: string
  isLoading: boolean
}

export const MultipleGambleButton = forwardRef<
  HTMLButtonElement,
  MultipleGambleButtonProps
>(({ onClick, size, text, isLoading }, ref) => {
  MultipleGambleButton.displayName = 'MultipleGambleButton'

  const handleClick = () => {
    onClick()
  }

  return (
    <ChakraButton
      isLoading={isLoading}
      onClick={handleClick}
      className="flex bg-blue-800 w-16 h-16 rounded-2xl"
      size={size}
      ref={ref}
    >
      {text}
    </ChakraButton>
  )
})
