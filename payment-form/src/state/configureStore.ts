import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { accountsApi } from './accountsApi';
import { accountsSlice } from './accountsSlice';
import { ibanApi } from './ibanApi';
import { pageSlice } from './pageSlice';

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [ibanApi.reducerPath]: ibanApi.reducer,

    [accountsSlice.name]: accountsSlice.reducer,
    [pageSlice.name]: pageSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(accountsApi.middleware, ibanApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
