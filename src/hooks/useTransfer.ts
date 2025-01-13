import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import { parseUnits } from 'viem';
import { useEffect } from 'react';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TTokenNames from '../types/tokenNames.type';
import TChainName from '../types/chainNames.type';
import useGetBalance from './useGetBalance';

interface IuseTransferReturn {
  txStatus: {
    isConfirming: boolean;
    isPending: boolean;
  };
  handleTransfer: (targetAddress: string | null, tokenName: TTokenNames) => void;
}

interface IUseTransferProps {
  amount: string | null;
}

const useTransfer = ({ amount }: IUseTransferProps): IuseTransferReturn => {
  const { chain } = useAccount();
  const { dai, usdc } = useGetBalance();

  const balances = {
    dai,
    usdc,
  };

  const { data: hash, isPending, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async (targetAddress: string | null, tokenName: TTokenNames) => {
    if (!targetAddress) {
      toast.error('You need to write a target address');
      return;
    }

    if (!amount) {
      toast.error('Specify the amount');
      return;
    }

    // tested from 0xEF2FAbba5efc17f3740654A6D13C765ba7B3aDAD to 0xE9b11c9586a1Ec25EABeb2083f93b118FFD8be53
    const { contract, decimals } = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];
    const balance = balances[tokenName].balance;

    if (+amount > balance) {
      toast.error('Not enough cash!');
      return;
    }

    writeContract({
      ...contract,
      functionName: 'transfer',
      args: [targetAddress, parseUnits(amount, decimals)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('¡Transfer successful!');
    }

    if (isError) {
      toast.success(`Error ${error}`);
    }
  }, [error, isConfirmed, isError]);

  return {
    txStatus: {
      isConfirming,
      isPending,
    },
    handleTransfer,
  };
};

export default useTransfer;
