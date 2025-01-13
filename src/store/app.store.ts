import { configureStore } from '@reduxjs/toolkit';
import balancesReducer from './balances/balances.slice';

export const store = configureStore({
  reducer: {
    balances: balancesReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
