import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configurationApi } from './configurationApi';
import { configurationSlice } from './configurationSlice';
import { formApi } from './formApi';
import { formSlice } from './formSlice';
import { pageSlice } from './pageSlice';
import { toastSlice } from './toatsSlice';

export const store = configureStore({
  reducer: {
    [configurationApi.reducerPath]: configurationApi.reducer,
    [configurationSlice.name]: configurationSlice.reducer,
    [pageSlice.name]: pageSlice.reducer,
    [toastSlice.name]: toastSlice.reducer,
    [formSlice.name]: formSlice.reducer,
    [formApi.reducerPath]: formApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(configurationApi.middleware, formApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
