import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';

interface ITokenData {
  balance: number;
  isLoading: boolean;
}

interface IBalancesReturn {
  dai: ITokenData;
  usdc: ITokenData;
}

const useGetBalance = (): IBalancesReturn => {
  const { address, chain } = useAccount();

  const chainName = chain?.name ?? 'dai';

  const { dai, usdc } = TOKEN_CONTRACT_MAPPER[chainName as TChainName];

  const { data: daiBalance, isLoading: isLoadingDai } = useReadContract({
    address: dai.contract.address,
    abi: dai.contract.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: usdcBalance, isLoading: isLoadingUsdc } = useReadContract({
    address: usdc.contract.address,
    abi: usdc.contract.abi,
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
