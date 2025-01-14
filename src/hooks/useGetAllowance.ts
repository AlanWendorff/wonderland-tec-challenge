import { selectSpender } from '@store/account/account.selectors';
import { useAccount, useReadContract } from 'wagmi';
import { useSelector } from 'react-redux';
import { formatUnits } from 'viem';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import TChainName from '../types/chainNames.type';

interface IUseGetAllowanceReturn {
  allowance: {
    dai: number;
    usdc: number;
  };
}

const useGetAllowance = (): IUseGetAllowanceReturn => {
  const { address, chain } = useAccount();
  const spender = useSelector(selectSpender);
  const chainName = chain?.name ?? 'dai';

  const { dai, usdc } = TOKEN_CONTRACT_MAPPER[chainName as TChainName];

  const { data: daiAllowance, isLoading: isLoadingDai } = useReadContract({
    ...dai.contract,
    functionName: 'allowance',
    args: [address, spender],
  });

  const { data: usdcAllowance, isLoading: isLoadingUsdc } = useReadContract({
    ...usdc.contract,
    functionName: 'allowance',
    args: [address, spender],
  });

  return {
    allowance: {
      dai:
        isLoadingDai || !spender
          ? 0
          : parseFloat(formatUnits(daiAllowance as bigint, dai.decimals)),
      usdc:
        isLoadingUsdc || !spender
          ? 0
          : parseFloat(formatUnits(usdcAllowance as bigint, usdc.decimals)),
    },
  };
};

export default useGetAllowance;
