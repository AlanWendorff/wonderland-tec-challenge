import {
  DAI_CONTRACT_ADDRESS_SEPOLIA,
  USDC_CONTRACT_ADDRESS_SEPOLIA,
  DAI_CONTRACT_ADDRESS_MUMBAI,
  USDC_CONTRACT_ADDRESS_MUMBAI,
} from '@constants/env';
import DAI_CONTRACT_SEPOLIA from '../abis/sepolia/daiContract.abi';
import USDC_CONTRACT_SEPOLIA from '../abis/sepolia/usdcContract.abi';

const TOKEN_CONTRACT = {
  Sepolia: {
    dai: {
      contract: {
        address: DAI_CONTRACT_ADDRESS_SEPOLIA,
        abi: DAI_CONTRACT_SEPOLIA,
      },
      decimals: 18,
    },
    usdc: {
      contract: { address: USDC_CONTRACT_ADDRESS_SEPOLIA, abi: USDC_CONTRACT_SEPOLIA },
      decimals: 6,
    },
  },
  Mumbai: {
    dai: {
      contract: {
        address: DAI_CONTRACT_ADDRESS_MUMBAI,
        abi: DAI_CONTRACT_SEPOLIA, // I didn't find mumbai's related token contracts and ABI's for dai and usdc
      },
      decimals: 18,
    },
    usdc: {
      contract: { address: USDC_CONTRACT_ADDRESS_MUMBAI, abi: USDC_CONTRACT_SEPOLIA },
      decimals: 6,
    },
  },
};

export default TOKEN_CONTRACT;
