import { Button as ChakraButton } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface MultipleGambleButtonProps {
  text: string | number
  onClick: () => void
  size: string
  isLoading: boolean
  onOpen: () => void 
}

export const MultipleGambleButton = forwardRef<HTMLButtonElement, MultipleGambleButtonProps>(({ onClick, size, text, isLoading, onOpen }, ref) => {
  MultipleGambleButton.displayName = 'MultipleGambleButton';
  
  const handleClick = () => {
    onClick();
    onOpen();
  };

  return (
    <ChakraButton
      isLoading={isLoading}
      onClick={handleClick}
      className='flex bg-blue-800 w-16 h-16 rounded-2xl'
      size={size}
      ref={ref}
    >
      {text}
    </ChakraButton>
  );
});
