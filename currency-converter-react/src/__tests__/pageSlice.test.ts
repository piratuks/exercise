import { configureStore } from '@reduxjs/toolkit';
import { RootState } from 'state/configureStore';
import { disableLoading, enableLoading, pageSlice, selectIsLoading } from 'state/pageSlice';

describe('pageSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { pageSlice: pageSlice.reducer } });
  });

  it('should return the initial state', () => {
    const state = store.getState() as RootState;
    expect(state.pageSlice).toEqual({ isLoading: true });
  });

  it('should handle enableLoading', () => {
    store.dispatch(enableLoading());
    const state = store.getState() as RootState;
    expect(state.pageSlice.isLoading).toBe(true);
  });

  it('should handle disableLoading', () => {
    store.dispatch(disableLoading());

    let state = store.getState() as RootState;
    expect(state.pageSlice.isLoading).toBe(false);

    store.dispatch(enableLoading());

    state = store.getState() as RootState;
    expect(state.pageSlice.isLoading).toBe(true);
  });

  it('should select isLoading state correctly', () => {
    let state = store.getState() as RootState;
    expect(state.pageSlice.isLoading).toBe(true);

    store.dispatch(disableLoading());

    state = store.getState() as RootState;
    expect(selectIsLoading(state)).toBe(false);

    store.dispatch(enableLoading());

    state = store.getState() as RootState;
    expect(selectIsLoading(state)).toBe(true);
  });
});
