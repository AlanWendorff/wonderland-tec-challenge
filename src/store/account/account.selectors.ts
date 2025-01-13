import { AppState } from '../app.store';

export const selectAddress = (state: AppState) => state.account.address;
export const selectIsWalletConnected = (state: AppState) => state.account.isWalletConnected;
