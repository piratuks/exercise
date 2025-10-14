import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage, getErrorStatus } from '../state/apiError';

export const handleError = (err: FetchBaseQueryError | SerializedError) => {
  const msg = getErrorMessage(err);
  const status = getErrorStatus(err);
  if (msg && (status == 400 || status == 401)) {
    return { msg: msg };
  } else if (status == 500) {
    return { msg: 'Server error' };
  } else {
    return { msg: 'Server error' };
  }
};
