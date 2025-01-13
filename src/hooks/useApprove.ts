import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';
import TTokenNames from '../types/tokenNames.type';
import { parseUnits } from 'viem';

interface IuseApproveReturn {
  approveStatus: {
    isConfirming: boolean;
    isConfirmed: boolean;
    isPending: boolean;
  };
  handleApprove: (spender: string, tokenName: TTokenNames) => void;
}

interface IUseApproveProps {
  amount: string;
}

const useApprove = ({ amount }: IUseApproveProps): IuseApproveReturn => {
  const { chain } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = async (spender: string, tokenName: TTokenNames) => {
    //tested with 0xEF2FAbba5efc17f3740654A6D13C765ba7B3aDAD
    const { contract, decimals } = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];

    writeContract({
      ...contract,
      functionName: 'approve',
      args: [spender, parseUnits(amount, decimals)],
    });
  };

  return {
    approveStatus: {
      isConfirming,
      isConfirmed,
      isPending,
    },
    handleApprove,
  };
};

export default useApprove;
