import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const isSerializedError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is SerializedError => errorResponse && 'message' in errorResponse;

export const isFetchBaseQueryError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is FetchBaseQueryError => errorResponse && 'status' in errorResponse;

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if (isSerializedError(error) && error.message) return error.message;

  return 'Something happened durring request';
};
