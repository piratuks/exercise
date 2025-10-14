import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { describe, expect, it } from 'vitest';
import {
  getErrorFields,
  getErrorMessage,
  getErrorStatus,
  isFetchBaseQueryError,
  isSerializedError
} from '../state/apiError';

describe('apiError helpers', () => {
  const serializedError: SerializedError = { name: 'TestError', message: 'Serialized error' };
  const fetchErrorWithData: FetchBaseQueryError = {
    status: 400,
    data: { message: 'Fetch error message', error: { field: 'value' } }
  };
  const fetchErrorWithoutData: FetchBaseQueryError = { status: 500, data: null };

  it('isSerializedError identifies serialized errors', () => {
    expect(isSerializedError(serializedError)).toBe(true);
    expect(isSerializedError(fetchErrorWithData)).toBe(false);
  });

  it('isFetchBaseQueryError identifies fetch base query errors', () => {
    expect(isFetchBaseQueryError(fetchErrorWithData)).toBe(true);
    expect(isFetchBaseQueryError(serializedError)).toBe(false);
  });

  it('getErrorFields returns error object for FetchBaseQueryError with error field', () => {
    expect(getErrorFields(fetchErrorWithData)).toEqual({ field: 'value' });
  });

  it('getErrorFields returns empty object if no error field', () => {
    expect(getErrorFields(fetchErrorWithoutData)).toEqual({});
    expect(getErrorFields(serializedError)).toEqual({});
  });

  it('getErrorStatus returns status for FetchBaseQueryError', () => {
    expect(getErrorStatus(fetchErrorWithData)).toBe(400);
    expect(getErrorStatus(fetchErrorWithoutData)).toBe(500);
  });

  it('getErrorStatus returns null for SerializedError', () => {
    expect(getErrorStatus(serializedError)).toBeNull();
  });

  it('getErrorMessage returns message for SerializedError', () => {
    expect(getErrorMessage(serializedError)).toBe('Serialized error');
  });

  it('getErrorMessage returns message from data for FetchBaseQueryError', () => {
    expect(getErrorMessage(fetchErrorWithData)).toBe('Fetch error message');
  });

  it('getErrorMessage returns default message for FetchBaseQueryError without data', () => {
    expect(getErrorMessage(fetchErrorWithoutData)).toBe('Something happened durring request');
  });
});
