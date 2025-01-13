import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Address } from 'viem';
import IAccountState from '@interfaces/store/account.interface';

const initialState: IAccountState = {
  address: null,
  isWalletConnected: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address | null>) => {
      state.address = action.payload;
    },
    setIsWalletConnected: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);

      state.isWalletConnected = action.payload;
    },
  },
});

export const { setAddress, setIsWalletConnected } = accountSlice.actions;

export default accountSlice.reducer;
