import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { getErrorMessage, isFetchBaseQueryError } from 'state/apiError';

describe('Error Utilities', () => {
  describe('isFetchBaseQueryError', () => {
    it('should return true for a FetchBaseQueryError', () => {
      const error: FetchBaseQueryError = { status: 404, data: null };
      expect(isFetchBaseQueryError(error)).toBe(true);
    });

    it('should return false for a SerializedError', () => {
      const error: SerializedError = { message: 'Serialized error occurred', name: 'Error', stack: '' };
      expect(isFetchBaseQueryError(error)).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should return the message from SerializedError', () => {
      const error: SerializedError = { message: 'Serialized error occurred', name: 'Error', stack: '' };
      expect(getErrorMessage(error)).toBe('Serialized error occurred');
    });

    it('should return default message for FetchBaseQueryError', () => {
      const error: FetchBaseQueryError = { status: 500, data: null };
      expect(getErrorMessage(error)).toBe('Something happened durring request');
    });

    it('should return default message for an error without a message', () => {
      const error: SerializedError = { name: 'Error', stack: '' };
      expect(getErrorMessage(error)).toBe('Something happened durring request');
    });
  });
});
