import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from '../app/App';
import { accountsApi } from '../state/accountsApi';
import { accountsReducer, type AccountsState } from '../state/accountsSlice';
import { pageReducer, type PageState } from '../state/pageSlice';

export const renderWithStore = (preloadedState?: { pageSlice: PageState; accountsSlice: AccountsState }) => {
  const store = configureStore({
    reducer: {
      pageSlice: pageReducer,
      accountsSlice: accountsReducer,
      [accountsApi.reducerPath]: accountsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(accountsApi.middleware),
    ...(preloadedState && { preloadedState })
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <App />
      </ThemeProvider>
    </Provider>
  );

  return store;
};
