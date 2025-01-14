import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import TOKEN_CONTRACT from '@constants/tokenContract';
import TChainName from '../types/chainNames.type';

interface ITokenData {
  balance: number;
  isLoading: boolean;
}

interface IUseGetBalanceReturn {
  dai: ITokenData;
  usdc: ITokenData;
}

const useGetBalance = (): IUseGetBalanceReturn => {
  const { address, chain } = useAccount();

  const chainName = chain?.name ?? 'dai';

  const { dai, usdc } = TOKEN_CONTRACT[chainName as TChainName];

  const { data: daiBalance, isLoading: isLoadingDai } = useReadContract({
    ...dai.contract,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: usdcBalance, isLoading: isLoadingUsdc } = useReadContract({
    ...usdc.contract,
    functionName: 'balanceOf',
    args: [address],
  });

  return {
    dai: {
      balance: isLoadingDai ? 0 : parseFloat(formatUnits(daiBalance as bigint, dai.decimals)),
      isLoading: isLoadingDai,
    },
    usdc: {
      balance: isLoadingUsdc ? 0 : parseFloat(formatUnits(usdcBalance as bigint, usdc.decimals)),
      isLoading: isLoadingUsdc,
    },
  };
};

export default useGetBalance;
