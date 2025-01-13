import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Address } from 'viem';
import IAccountState from '@interfaces/store/account.interface';

const initialState: IAccountState = {
  address: null,
  isCorrectNetwork: false,
  isWalletConnected: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address | null>) => {
      state.address = action.payload;
    },
    setIsCorrectNetwork: (state, action: PayloadAction<boolean>) => {
      state.isCorrectNetwork = action.payload;
    },
    setIsWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
  },
});

export const { setAddress, setIsCorrectNetwork, setIsWalletConnected } = accountSlice.actions;

export default accountSlice.reducer;
