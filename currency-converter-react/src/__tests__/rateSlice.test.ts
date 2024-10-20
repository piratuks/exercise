import { configureStore } from '@reduxjs/toolkit';
import { CurrencyKey } from 'app/currency';
import { RootState } from 'state/configureStore';
import { RateResponse } from 'state/ratesApi';
import {
  loadPage,
  ratesSlice,
  selectFrom,
  selectFromAmount,
  selectRate,
  selectTo,
  selectToAmount
} from 'state/ratesSlice';

describe('ratesSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { ratesSlice: ratesSlice.reducer } });
  });

  it('should return the initial state', () => {
    const state = store.getState() as RootState;
    expect(state.ratesSlice).toEqual({
      from: null,
      to: null,
      rate: null,
      fromAmount: null,
      toAmount: null
    });
  });

  it('should handle loadPage', () => {
    const mockPayload: RateResponse = {
      from: CurrencyKey.eur,
      to: CurrencyKey.pln,
      rate: 1.2,
      fromAmount: 100,
      toAmount: 120
    };

    store.dispatch(loadPage(mockPayload));

    const state = store.getState() as RootState;

    expect(state.ratesSlice.from).toBe(mockPayload.from);
    expect(state.ratesSlice.to).toBe(mockPayload.to);
    expect(state.ratesSlice.rate).toBe(mockPayload.rate);
    expect(state.ratesSlice.fromAmount).toBe(mockPayload.fromAmount);
    expect(state.ratesSlice.toAmount).toBe(mockPayload.toAmount);
  });

  it('should select from correctly', () => {
    const mockPayload: RateResponse = {
      from: CurrencyKey.eur,
      to: CurrencyKey.pln,
      rate: 1.2,
      fromAmount: 100,
      toAmount: 120
    };

    store.dispatch(loadPage(mockPayload));

    const state = store.getState() as RootState;
    const from = selectFrom(state);
    expect(from).toBe(mockPayload.from);
  });

  it('should select to correctly', () => {
    const mockPayload: RateResponse = {
      from: CurrencyKey.eur,
      to: CurrencyKey.pln,
      rate: 1.2,
      fromAmount: 100,
      toAmount: 120
    };

    store.dispatch(loadPage(mockPayload));
    const state = store.getState() as RootState;
    const to = selectTo(state);
    expect(to).toBe(mockPayload.to);
  });

  it('should select rate correctly', () => {
    const mockPayload: RateResponse = {
      from: CurrencyKey.eur,
      to: CurrencyKey.pln,
      rate: 1.2,
      fromAmount: 100,
      toAmount: 120
    };

    store.dispatch(loadPage(mockPayload));
    const state = store.getState() as RootState;
    const rate = selectRate(state);
    expect(rate).toBe(mockPayload.rate);
  });

  it('should select fromAmount correctly', () => {
    const mockPayload: RateResponse = {
      from: CurrencyKey.eur,
      to: CurrencyKey.pln,
      rate: 1.2,
      fromAmount: 100,
      toAmount: 120
    };

    store.dispatch(loadPage(mockPayload));
    const state = store.getState() as RootState;
    const fromAmount = selectFromAmount(state);
    expect(fromAmount).toBe(mockPayload.fromAmount);
  });

  it('should select toAmount correctly', () => {
    const mockPayload: RateResponse = {
      from: CurrencyKey.eur,
      to: CurrencyKey.pln,
      rate: 1.2,
      fromAmount: 100,
      toAmount: 120
    };

    store.dispatch(loadPage(mockPayload));
    const state = store.getState() as RootState;
    const toAmount = selectToAmount(state);
    expect(toAmount).toBe(mockPayload.toAmount);
  });
});
