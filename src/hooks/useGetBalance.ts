import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';

interface TokenData {
  balance: number;
  isLoading: boolean;
}

interface ITokenBalancesReturn {
  dai: TokenData;
  usdc: TokenData;
}
type TChainName = 'Sepolia' | 'Mumbai';

const useGetBalance = (): ITokenBalancesReturn => {
  const { address, chain } = useAccount();

  const tokens = TOKEN_CONTRACT_MAPPER[chain?.name as TChainName];

  const { data: daiBalance, isLoading: isLoadingDai } = useReadContract({
    address: tokens.dai.address,
    abi: tokens.dai.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: usdcBalance, isLoading: isLoadingUsdc } = useReadContract({
    address: tokens.usdc.address,
    abi: tokens.usdc.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const dai = {
    balance: isLoadingDai ? 0 : parseFloat(formatUnits(daiBalance as bigint, 18)),
    isLoading: isLoadingDai,
  };

  const usdc = {
    balance: isLoadingUsdc ? 0 : parseFloat(formatUnits(usdcBalance as bigint, 6)),
    isLoading: isLoadingUsdc,
  };

  return { dai, usdc };
};

export default useGetBalance;
