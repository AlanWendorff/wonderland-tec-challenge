import { Address } from 'viem';

interface IAccountState {
  address: Address | null;
  isCorrectNetwork: boolean;
  isWalletConnected: boolean;
}

export default IAccountState;
