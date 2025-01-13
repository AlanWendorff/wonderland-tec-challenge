import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import { parseUnits } from 'viem';
import { useEffect } from 'react';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';
import TTokenNames from '../types/tokenNames.type';

interface IUseMintTokenReturn {
  isConfirming: boolean;
  isConfirmed: boolean;
  isPending: boolean;
  handleMintToken: (tokenName: TTokenNames) => void;
}

interface IUseMintTokenProps {
  amount: string;
}

const useMintToken = ({ amount }: IUseMintTokenProps): IUseMintTokenReturn => {
  const { address, chain } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMintToken = async (tokenName: TTokenNames) => {
    if (!amount) {
      toast.error('Specify the amount');
      return;
    }

    const { contract, decimals } = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];

    writeContract({
      ...contract,
      functionName: 'mint',
      args: [address, parseUnits(amount, decimals)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('¡Transfer successful!');
    }
  }, [isConfirmed]);

  return {
    isConfirming,
    isConfirmed,
    isPending,
    handleMintToken,
  };
};

export default useMintToken;
