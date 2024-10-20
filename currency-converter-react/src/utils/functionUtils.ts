import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { isSerializedError } from 'state/apiError';

export const showErrorToast = (msg: string) => {
  toast.error(msg, {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light'
  });
};

export const handleError = (error: FetchBaseQueryError | SerializedError) => {
  let msg = 'Something happened durring request';
  if (isSerializedError(error) && error.message) {
    msg = error.message;
  }
  showErrorToast(msg);
};

export const formatNumber = (num: number | null) => {
  return num ? parseFloat(num.toString()).toFixed(2) : '0.00';
};
