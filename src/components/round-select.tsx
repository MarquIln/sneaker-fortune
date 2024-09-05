import { Select as ChakraSelect } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'

interface RoundSelectProps {
  numRounds: number[]
  onSelectNumRounds: (numRounds: number) => void
}

export const RoundSelect = ({
  numRounds,
  onSelectNumRounds,
}: RoundSelectProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value)
    onSelectNumRounds(selectedValue)
  }

  return (
    <ChakraSelect
      bg="darkblue"
      color="white"
      variant="outline"
      onChange={handleChange}
    >
      {numRounds.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </ChakraSelect>
  )
}
