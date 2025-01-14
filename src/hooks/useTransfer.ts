import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { selectAddress } from '@store/account/account.selectors';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { parseUnits } from 'viem';
import { useEffect } from 'react';
import TOKEN_CONTRACT from '@constants/tokenContract';
import TTokenNames from '../types/tokenNames.type';
import TChainName from '../types/chainNames.type';
import useGetAllowance from './useGetAllowance';
import useGetBalance from './useGetBalance';

interface IuseTransferReturn {
  txStatus: {
    isConfirming: boolean;
    isPending: boolean;
  };
  handleTransfer: (targetAddress: string, tokenName: TTokenNames) => void;
}

interface IUseTransferProps {
  amount: string;
}

const useTransfer = ({ amount }: IUseTransferProps): IuseTransferReturn => {
  const { chain } = useAccount();
  const { dai, usdc } = useGetBalance();
  const { allowance } = useGetAllowance();
  const ownerAddress = useSelector(selectAddress);

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

  const handleTransfer = async (targetAddress: string, tokenName: TTokenNames) => {
    if (targetAddress === ownerAddress) {
      toast.error("Addresses can't be equal!");
      return;
    }

    if (targetAddress === '') {
      toast.error('You need to write a target address');
      return;
    }

    if (amount === '') {
      toast.error('Specify the amount');
      return;
    }

    // owner: 0xEF2FAbba5efc17f3740654A6D13C765ba7B3aDAD spender: 0xE9b11c9586a1Ec25EABeb2083f93b118FFD8be53
    const { contract, decimals } = TOKEN_CONTRACT[chain?.name as TChainName][tokenName];
    const balance = balances[tokenName].balance;

    if (balance < +amount) {
      toast.error('Not enough money!');
      return;
    }

    if (allowance[tokenName] < +amount) {
      toast.error('Allowance limit!');
      return;
    }

    writeContract({
      ...contract,
      functionName: 'transferFrom',
      args: [ownerAddress, targetAddress, parseUnits(amount, decimals)],
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
