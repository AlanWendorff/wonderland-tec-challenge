import { AppState } from '../app.store';

export const selectDaiToken = (state: AppState) => state.balances.dai;
export const selectUsdcToken = (state: AppState) => state.balances.usdc;
