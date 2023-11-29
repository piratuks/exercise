import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './configureStore';

export enum ToastPosition {
  topRight = 'topRight',
  topLeft = 'topLeft',
  bottomRight = 'bottomRight',
  bottomLeft = 'bottomLeft',
  topCenter = 'topCenter',
  bottomCenter = 'bottomCenter'
}

export enum ToastType {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info'
}

export interface ToastItem {
  id: string;
  desc: string;
  autoDeleteTime?: number;
  type: ToastType;
}

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface ToastState {
  toasts: Record<string, ToastItem>;
}

const initialState: ToastState = {
  toasts: {}
};

export const toastSlice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    toastAdd: (state, action: PayloadAction<ToastItem>) => {
      if (!state.toasts[action.payload.id]) state.toasts[action.payload.id] = action.payload;
    },
    toastRemove: (state, action: PayloadAction<string>) => {
      if (state.toasts && state.toasts[action.payload]) delete state.toasts[action.payload];
    }
  }
});

export const selectState = (state: RootState) => state.toastSlice;
export const selectToasts = createSelector(selectState, state => state.toasts);

export const { toastAdd, toastRemove } = toastSlice.actions;
