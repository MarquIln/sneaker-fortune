import { betValues } from '@/helpers/bet-values'
import { numberRounds } from '@/helpers/number-rounds'
import type { Player } from '@/types/player'
import { create } from 'zustand'

const useStore = create<Player>((set, get) => ({
  login: () => set({}),
  balance: 10000,
  increaseBalance: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
    })),
  decreaseBalance: (amount) =>
    set((state) => ({
      balance: state.balance - amount,
    })),
  resetBalance: () => set({ balance: 0 }),
  setBalance: (amount) => set({ balance: amount }),
  saveBalance: () => {
    const balance = get().balance
    localStorage.setItem('balance', balance.toString())
  },
  loadBalance: () => {
    const balance = localStorage.getItem('balance')
    if (balance !== null) {
      set({ balance: parseInt(balance, 10) })
    }
  },
  betValues: betValues.map((bet) => bet.value),
  numRounds: numberRounds[0],
  actualBet: betValues[0].id,
  setActualBet: (index) => set({ actualBet: index }),
  setNumRounds: (rounds) => set({ numRounds: rounds }),
  getActualBet: () => get().betValues[get().actualBet],
}))

export { useStore }
