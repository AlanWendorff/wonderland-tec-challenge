import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TTokenNames from '../types/tokenNames.type';
import TChainName from '../types/chainNames.type';

interface IuseApproveReturn {
  approveStatus: {
    isConfirming: boolean;
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
    if (spender == '') {
      toast.error('You need to write a spender address');
      return;
    }

    if (amount === '') {
      toast.error('Specify the amount');
      return;
    }

    // owner: 0xEF2FAbba5efc17f3740654A6D13C765ba7B3aDAD spender: 0xE9b11c9586a1Ec25EABeb2083f93b118FFD8be53
    const { contract, decimals } = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];

    writeContract({
      ...contract,
      functionName: 'approve',
      args: [spender, parseUnits(amount, decimals)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('¡Approval successful!');
    }
  }, [isConfirmed]);

  return {
    approveStatus: {
      isConfirming,
      isPending,
    },
    handleApprove,
  };
};

export default useApprove;
