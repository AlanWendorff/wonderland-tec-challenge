import { AppState } from '../app.store';

export const selectAddress = (state: AppState) => state.account.address;
export const selectSpender = (state: AppState) => state.account.spender;
export const selectIsCorrectNetwork = (state: AppState) => state.account.isCorrectNetwork;
export const selectIsWalletConnected = (state: AppState) => state.account.isWalletConnected;
