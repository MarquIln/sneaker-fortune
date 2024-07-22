import { create } from 'zustand'

const useStore = create<Player>((set, get) => ({
  balance: 0,
  increaseBalance: (amount) => set((state) => ({
    balance: state.balance + amount,
  })),
  decreaseBalance: (amount) => set((state) => ({
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
}))

export { useStore }
