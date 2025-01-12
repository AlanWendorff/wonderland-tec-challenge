import { Address } from 'viem';

// Web3
export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_APP_WALLETCONNECT_PROJECT_ID as string;

// Contracts sepolia
export const DAI_CONTRACT_ADDRESS_SEPOLIA = import.meta.env
  .VITE_DAI_CONTRACT_ADDRESS_SEPOLIA as Address;
export const USDC_CONTRACT_ADDRESS_SEPOLIA = import.meta.env
  .VITE_USDC_CONTRACT_ADDRESS_SEPOLIA as Address;

// Contracts mumbai
export const DAI_CONTRACT_ADDRESS_MUMBAI = import.meta.env
  .VITE_DAI_CONTRACT_ADDRESS_MUMBAI as Address;
export const USDC_CONTRACT_ADDRESS_MUMBAI = import.meta.env
  .VITE_USDC_CONTRACT_ADDRESS_MUMBAI as Address;

// App
export const APP_APP_NAME = import.meta.env.VITE_APP_APP_NAME as string;
