import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './account/account.slice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
