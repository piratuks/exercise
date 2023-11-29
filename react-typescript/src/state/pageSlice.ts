import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './configureStore';

interface PageState {
  isLoading: boolean;
}
const initialState: PageState = {
  isLoading: true
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
    }
  }
});

export const selectState = (state: RootState) => state.pageSlice;
export const selectIsLoading = createSelector(selectState, state => state.isLoading);

export const { enableLoading, disableLoading } = pageSlice.actions;
