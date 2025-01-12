import { polygonMumbai, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { APP_APP_NAME, WALLETCONNECT_PROJECT_ID } from '@constants/env';

export const config = getDefaultConfig({
  appName: APP_APP_NAME,
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [polygonMumbai, sepolia],
});
