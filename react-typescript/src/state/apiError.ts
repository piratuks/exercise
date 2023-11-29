import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { UserCRUDApiError } from './formApi';

export const isSerializedError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is SerializedError => errorResponse && 'message' in errorResponse;

export const isFetchBaseQueryError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is FetchBaseQueryError => errorResponse && 'status' in errorResponse;

export const isFetchBaseQueryErrorAndHaveMessage = (errorResponse: FetchBaseQueryError | SerializedError) =>
  isFetchBaseQueryError(errorResponse) &&
  typeof errorResponse.data === 'object' &&
  errorResponse.data !== null &&
  'message' in errorResponse.data;

export const isUserCRUDApiError = (
  errorResponse: FetchBaseQueryError | SerializedError
): errorResponse is UserCRUDApiError<object> => {
  return isFetchBaseQueryErrorAndHaveMessage(errorResponse);
};

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if (isSerializedError(error) && error.message) return error.message;
  if (isUserCRUDApiError(error) && error.data) return error.data.message;

  return 'Something happened durring request';
};
