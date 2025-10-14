import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ErrorObject } from './accountsApi';

export const isSerializedError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is SerializedError => errorResponse && 'message' in errorResponse;

export const isFetchBaseQueryError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is FetchBaseQueryError => errorResponse && 'status' in errorResponse;

export const getErrorFields = (error: FetchBaseQueryError | SerializedError) => {
  if (isFetchBaseQueryError(error) && error.data) {
    if (error.data && typeof error.data === 'object' && 'error' in error.data) {
      return error.data.error as ErrorObject;
    }
    return {};
  }

  return {};
};

export const getErrorStatus = (error: FetchBaseQueryError | SerializedError) => {
  if (isFetchBaseQueryError(error) && error.status) {
    return error.status;
  }

  return null;
};

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if (isSerializedError(error) && error.message) return error.message;
  if (isFetchBaseQueryError(error) && error.data) {
    if (error.data && typeof error.data === 'object' && 'message' in error.data) {
      return error.data.message as string;
    }
    return 'Something happened durring request';
  }

  return 'Something happened durring request';
};
