import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TTokenNames from '../types/tokenNames.type';
import TChainName from '../types/chainNames.type';
import useGetBalance from './useGetBalance';

interface IuseApproveReturn {
  approveStatus: {
    isConfirming: boolean;
    isConfirmed: boolean;
    isPending: boolean;
  };
  handleApprove: (spender: string | null, tokenName: TTokenNames) => void;
}

interface IUseApproveProps {
  amount: string | null;
}

const useApprove = ({ amount }: IUseApproveProps): IuseApproveReturn => {
  const { chain } = useAccount();
  const { dai, usdc } = useGetBalance();

  const balances = {
    dai,
    usdc,
  };

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = async (spender: string | null, tokenName: TTokenNames) => {
    if (!spender) {
      toast.error('You need to write a target address');
      return;
    }

    if (!amount) {
      toast.error('Specify the amount');
      return;
    }

    //tested with 0xEF2FAbba5efc17f3740654A6D13C765ba7B3aDAD
    const { contract, decimals } = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];
    const balance = balances[tokenName].balance;

    if (+amount > balance) {
      toast.error('Not enough cash!');
      return;
    }

    writeContract({
      ...contract,
      functionName: 'approve',
      args: [spender, parseUnits(amount, decimals)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('¡Transfer successful!');
    }
  }, [isConfirmed]);

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
