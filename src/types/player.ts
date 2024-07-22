interface Player {
  balance: number;
  increaseBalance: (amount: number) => void;
  decreaseBalance: (amount: number) => void;
  resetBalance: () => void;
  setBalance: (amount: number) => void;
  saveBalance: () => void;
  loadBalance: () => void;
}
