import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';
import TTokenNames from '../types/tokenNames.type';
import { parseUnits } from 'viem';

interface IuseTransferReturn {
  isConfirming: boolean;
  isConfirmed: boolean;
  isPending: boolean;
  handleTransfer: (targetAddress: string, tokenName: TTokenNames) => void;
}

interface IUseTransferProps {
  amount: string;
}

const useTransfer = ({ amount }: IUseTransferProps): IuseTransferReturn => {
  const { chain } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async (targetAddress: string, tokenName: TTokenNames) => {
    //tested with from 0xEF2FAbba5efc17f3740654A6D13C765ba7B3aDAD to 0xE9b11c9586a1Ec25EABeb2083f93b118FFD8be53
    const { contract, decimals } = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];

    writeContract({
      ...contract,
      functionName: 'transfer',
      args: [targetAddress, parseUnits(amount, decimals)],
    });
  };

  return {
    isConfirming,
    isConfirmed,
    isPending,
    handleTransfer,
  };
};

export default useTransfer;
