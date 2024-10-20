import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configurationApi } from './configurationApi';
import { configurationSlice } from './configurationSlice';
import { pageSlice } from './pageSlice';
import { ratesApi } from './ratesApi';
import { ratesSlice } from './ratesSlice';

export const store = configureStore({
  reducer: {
    [configurationApi.reducerPath]: configurationApi.reducer,
    [configurationSlice.name]: configurationSlice.reducer,
    [pageSlice.name]: pageSlice.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
    [ratesSlice.name]: ratesSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(configurationApi.middleware, ratesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
