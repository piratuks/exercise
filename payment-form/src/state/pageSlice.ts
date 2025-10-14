import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { ToastProps } from '../components/toast/toast';
import type { RootState } from './configureStore';

export interface ToastMeta extends ToastProps {
  id: string;
}

export interface PageState {
  isLoading: boolean;
  toasts: ToastMeta[];
}
const initialState: PageState = {
  isLoading: false,
  toasts: []
};

export const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    enableLoading: state => {
      state.isLoading = true;
    },
    disableLoading: state => {
      state.isLoading = false;
    },
    addToast: (state, action: PayloadAction<ToastProps>) => {
      state.toasts.push({
        ...action.payload,
        id: uuidv4()
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    }
  }
});

export const selectState = (state: RootState) => state.pageSlice;
export const selectIsLoading = createSelector(selectState, state => state.isLoading);
export const selectToasts = createSelector(selectState, state => state.toasts);

export const { enableLoading, disableLoading, addToast, removeToast } = pageSlice.actions;

export const pageReducer = pageSlice.reducer;
