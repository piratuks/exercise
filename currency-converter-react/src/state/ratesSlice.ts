import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyKey } from 'app/currency';
import { RootState } from './configureStore';
import { RateResponse } from './ratesApi';

export interface RateState {
  from: CurrencyKey | null;
  to: CurrencyKey | null;
  rate: number | null;
  fromAmount: number | null;
  toAmount: number | null;
}

const initialState: RateState = {
  from: null,
  to: null,
  rate: null,
  fromAmount: null,
  toAmount: null
};

export const ratesSlice = createSlice({
  name: 'ratesSlice',
  initialState,
  reducers: {
    loadPage: (state, action: PayloadAction<RateResponse>) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.rate = action.payload.rate;
      state.fromAmount = action.payload.fromAmount;
      state.toAmount = action.payload.toAmount;
    }
  }
});

export const selectFrom = (state: RootState) => state.ratesSlice.from;
export const selectTo = (state: RootState) => state.ratesSlice.to;
export const selectRate = (state: RootState) => state.ratesSlice.rate;
export const selectFromAmount = (state: RootState) => state.ratesSlice.fromAmount;
export const selectToAmount = (state: RootState) => state.ratesSlice.toAmount;

export const { loadPage } = ratesSlice.actions;
