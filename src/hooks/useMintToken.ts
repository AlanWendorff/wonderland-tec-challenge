import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';
import TTokenNames from '../types/tokenNames.type';

interface IUseMintTokenReturn {
  isConfirming: boolean;
  isConfirmed: boolean;
  isPending: boolean;
  handleMintToken: (tokenId: number, tokenName: TTokenNames) => void;
}

const useMintToken = (): IUseMintTokenReturn => {
  const { chain } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMintToken = async (tokenId: number, tokenName: TTokenNames) => {
    const contract = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName][tokenName];

    writeContract({
      ...contract,
      functionName: 'mint',
      args: [tokenId], //... to do
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
