import { screen } from '@testing-library/react';
import { renderWithStore } from './renderWithStore';

vitest.mock('../pages/payment-form', () => ({
  PaymentForm: () => <div data-testid="mock-payment-form">Mock PaymentForm</div>
}));

describe('App component', () => {
  it('renders PaymentForm', () => {
    renderWithStore();
    expect(screen.getByText(/Mock PaymentForm/i)).toBeInTheDocument();
  });

  it('renders ToastContainer with toasts', async () => {
    const store = renderWithStore({
      pageSlice: {
        isLoading: false,
        toasts: [{ id: '1', message: 'Test toast', severity: 'error', autoHideDuration: 1000000 }]
      },
      accountsSlice: {
        accounts: [],
        selectAccount: undefined,
        locale: 'en'
      }
    });

    expect(store.getState().pageSlice.toasts).toHaveLength(1);
    expect(store.getState().pageSlice.toasts[0].message).toBe('Test toast');
  });

  it('renders SpinnerOverlay when isLoading is true', async () => {
    renderWithStore({
      pageSlice: {
        isLoading: true,
        toasts: []
      },
      accountsSlice: {
        accounts: [],
        selectAccount: undefined,
        locale: 'en'
      }
    });
    const alert = screen.getByRole('progressbar');
    expect(alert).toBeInTheDocument();
  });
});
