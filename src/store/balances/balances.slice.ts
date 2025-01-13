import IBalancesState from '@interfaces/balancesState.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IBalancesState = {
  dai: { balance: 0, isLoading: false },
  usdc: { balance: 0, isLoading: false },
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    setDaiBalance(state, action: PayloadAction<number>) {
      state.dai.balance = action.payload;
      state.dai.isLoading = false;
    },
    setUsdcBalance(state, action: PayloadAction<number>) {
      state.usdc.balance = action.payload;
      state.usdc.isLoading = false;
    },
    setLoadingDai(state) {
      state.dai.isLoading = true;
    },
    setLoadingUsdc(state) {
      state.usdc.isLoading = true;
    },
  },
});

export const { setDaiBalance, setUsdcBalance, setLoadingDai, setLoadingUsdc } =
  balancesSlice.actions;

export default balancesSlice.reducer;
