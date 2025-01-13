import { useAccount, useReadContract } from 'wagmi';
import { useDispatch } from 'react-redux';
import { formatUnits } from 'viem';
import TOKEN_CONTRACT_MAPPER from '@utils/tokenContractMapper.util';
import {
  setDaiBalance,
  setUsdcBalance,
  setLoadingDai,
  setLoadingUsdc,
} from '@store/balances/balances.slice';
import IBalancesState from '@interfaces/balancesState.interface';
import TChainName from '../types/chainNames.type';

type TTokenBalancesReturn = IBalancesState;

const useGetBalance = (): TTokenBalancesReturn => {
  const dispatch = useDispatch();
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

  if (isLoadingDai) {
    dispatch(setLoadingDai());
  } else {
    dispatch(setDaiBalance(parseFloat(formatUnits(daiBalance as bigint, 18))));
  }

  if (isLoadingUsdc) {
    dispatch(setLoadingUsdc());
  } else {
    dispatch(setUsdcBalance(parseFloat(formatUnits(usdcBalance as bigint, 6))));
  }

  return {
    dai: {
      balance: isLoadingDai ? 0 : parseFloat(formatUnits(daiBalance as bigint, 18)),
      isLoading: isLoadingDai,
    },
    usdc: {
      balance: isLoadingUsdc ? 0 : parseFloat(formatUnits(usdcBalance as bigint, 6)),
      isLoading: isLoadingUsdc,
    },
  };
};

export default useGetBalance;
