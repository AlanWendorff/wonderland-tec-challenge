import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';
import TTokenNames from '../types/tokenNames.type';
import { parseEther } from 'viem';

interface IUseMintTokenReturn {
  isConfirming: boolean;
  isConfirmed: boolean;
  isPending: boolean;
  handleMintToken: (tokenName: TTokenNames) => void;
}

const useMintToken = (): IUseMintTokenReturn => {
  const { address, chain } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMintToken = async (tokenName: TTokenNames) => {
    const contract = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];

    writeContract({
      ...contract,
      functionName: 'mint',
      args: [address, parseEther('100')],
    });
  };

  return {
    isConfirming,
    isConfirmed,
    isPending,
    handleMintToken,
  };
};

export default useMintToken;
