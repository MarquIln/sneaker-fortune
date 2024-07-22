import { Select as ChakraSelect } from "@chakra-ui/react";
import { betValues } from "@/helpers/bet-values";

export const Select = () => {
  return (
    <ChakraSelect placeholder="Choose bet value" bg='darkblue' color='white'>
      {betValues.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </ChakraSelect>
  )
}