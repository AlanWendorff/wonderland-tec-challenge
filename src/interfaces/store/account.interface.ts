import { Address } from 'viem';

interface IAccountState {
  address: Address | null;
  isWalletConnected: boolean;
}

export default IAccountState;
