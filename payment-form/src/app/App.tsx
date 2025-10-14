import { Box } from '@mui/material';
import { useCallback, type FC } from 'react';
import { SpinnerOverlay } from '../components/spinner/spinner';
import { ToastContainer } from '../components/toast/toastContainer';
import { PaymentForm } from '../pages/payment-form';
import { useAppDispatch, useAppSelector } from '../state/configureStore';
import { removeToast, selectIsLoading, selectToasts } from '../state/pageSlice';

export const App: FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (id: string) => {
      dispatch(removeToast(id));
    },
    [dispatch]
  );

  return (
    <>
      <Box>
        <PaymentForm />
      </Box>
      <ToastContainer toasts={toasts} onClose={handleClose} />
      {isLoading && <SpinnerOverlay />}
    </>
  );
};
