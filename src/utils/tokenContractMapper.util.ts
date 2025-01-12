import {
  DAI_CONTRACT_ADDRESS_SEPOLIA,
  USDC_CONTRACT_ADDRESS_SEPOLIA,
  DAI_CONTRACT_ADDRESS_MUMBAI,
  USDC_CONTRACT_ADDRESS_MUMBAI,
} from '@constants/env';
import DAI_CONTRACT_SEPOLIA from '../contracts/sepolia/daiContract.abi';
import USDC_CONTRACT_SEPOLIA from '../contracts/sepolia/usdcContract.abi';

const TOKEN_CONTRACT_MAPPER = {
  Sepolia: {
    dai: {
      address: DAI_CONTRACT_ADDRESS_SEPOLIA,
      abi: DAI_CONTRACT_SEPOLIA,
    },
    usdc: {
      address: USDC_CONTRACT_ADDRESS_SEPOLIA,
      abi: USDC_CONTRACT_SEPOLIA,
    },
  },
  Mumbai: {
    dai: {
      address: DAI_CONTRACT_ADDRESS_MUMBAI,
      abi: DAI_CONTRACT_SEPOLIA, // to do change to mumbai
    },
    usdc: {
      address: USDC_CONTRACT_ADDRESS_MUMBAI,
      abi: USDC_CONTRACT_SEPOLIA, // to do change to mumbai
    },
  },
};

export default TOKEN_CONTRACT_MAPPER;
