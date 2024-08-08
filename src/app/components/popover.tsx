import { betValues } from '@/helpers/bet-values'
import {
  Box,
  Button,
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react'

interface CustomPopoverProps {
  isOpen: boolean
  onClose: () => void
  onBetsChange: (value: number) => void
}

export const Popover = ({
  isOpen,
  onClose,
  onBetsChange,
}: CustomPopoverProps) => {
  const confirmBet = (bet: number) => {
    onBetsChange(bet)
    onClose()
  }

  return (
    <ChakraPopover
      isOpen={isOpen}
      onClose={onClose}
      placement="right-end"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          onClick={onClose}
          style={{ visibility: 'hidden', position: 'absolute' }}
        >
          Trigger
        </Button>
      </PopoverTrigger>
      <PopoverContent bg={'red'} className="w-full h-full rounded-full">
        <PopoverHeader>How many times do you want to roll?</PopoverHeader>
        <PopoverBody>
          <Box className="flex gap-4 justify-center">
            {betValues?.map((bet) => (
              <Button key={bet.id} onClick={() => confirmBet(bet.value)}>
                {bet.value}
              </Button>
            ))}
          </Box>
        </PopoverBody>
        <PopoverFooter>
          <PopoverCloseButton />
        </PopoverFooter>
      </PopoverContent>
    </ChakraPopover>
  )
}
