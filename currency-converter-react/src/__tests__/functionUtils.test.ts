// utils.test.ts
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { formatNumber, handleError, showErrorToast } from 'utils/functionUtils';

// Mock the toast function
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('Utility Functions', () => {
  describe('showErrorToast', () => {
    it('should call toast.error with the correct message', () => {
      const message = 'An error occurred';
      showErrorToast(message);
      expect(toast.error).toHaveBeenCalledWith(message, {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
    });
  });

  describe('handleError', () => {
    it('should show default error message for FetchBaseQueryError', () => {
      const error: FetchBaseQueryError = {
        status: 500,
        data: undefined
      };
      handleError(error);
      expect(toast.error).toHaveBeenCalledWith('Something happened durring request', expect.any(Object));
    });

    it('should show default error message for SerializedError without message', () => {
      const error: SerializedError = { name: 'Error', message: undefined, stack: undefined };
      handleError(error);
      expect(toast.error).toHaveBeenCalledWith('Something happened durring request', expect.any(Object));
    });

    it('should show specific error message for SerializedError', () => {
      const error: SerializedError = { name: 'Error', message: 'An error occurred', stack: undefined };
      handleError(error);
      expect(toast.error).toHaveBeenCalledWith('An error occurred', expect.any(Object));
    });
  });

  describe('formatNumber', () => {
    it('should format a number to two decimal places', () => {
      const result = formatNumber(1234.567);
      expect(result).toBe('1234.57');
    });

    it('should return "0.00" for null input', () => {
      const result = formatNumber(null);
      expect(result).toBe('0.00');
    });

    it('should return "0.00" for zero input', () => {
      const result = formatNumber(0);
      expect(result).toBe('0.00');
    });
  });
});
