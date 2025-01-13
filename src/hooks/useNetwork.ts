import {
  setAddress,
  setIsCorrectNetwork,
  setIsWalletConnected,
} from '@store/account/account.slice';
import { CONFIG } from '../config/rainbowkit.config';
import { watchAccount } from 'wagmi/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Address } from 'viem';
import { useChains } from 'wagmi';

const useNetwork = () => {
  const dispatch = useDispatch();
  const chains = useChains();
  const targetNetworksIds = chains.map(({ id }) => +id);

  useEffect(() => {
    const watch = watchAccount(CONFIG, {
      onChange(data) {
        const { address, chainId } = data;

        if (chainId) {
          const isCorrectNetwork = targetNetworksIds.includes(chainId);
          dispatch(setIsCorrectNetwork(isCorrectNetwork));
        }

        dispatch(setAddress(address as Address));
        dispatch(setIsWalletConnected(!!address));
      },
    });

    return () => watch();
  }, [dispatch, targetNetworksIds]);
};

export default useNetwork;
