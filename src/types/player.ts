interface Player {
  balance: number;
  increaseBalance: (amount: number) => void;
  decreaseBalance: (amount: number) => void;
  resetBalance: () => void;
  setBalance: (amount: number) => number;
  saveBalance: () => void;
  loadBalance: () => void;
}
