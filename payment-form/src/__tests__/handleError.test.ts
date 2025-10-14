import { describe, expect, it, vi } from 'vitest';
import { handleError } from '../shared/handleError';
import * as apiError from '../state/apiError'; // Import to mock

describe('handleError', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns the error message for status 400', () => {
    vi.spyOn(apiError, 'getErrorMessage').mockReturnValue('Bad request');
    vi.spyOn(apiError, 'getErrorStatus').mockReturnValue(400);

    const result = handleError({});
    expect(result).toEqual({ msg: 'Bad request' });
  });

  it('returns the error message for status 401', () => {
    vi.spyOn(apiError, 'getErrorMessage').mockReturnValue('Unauthorized');
    vi.spyOn(apiError, 'getErrorStatus').mockReturnValue(401);

    const result = handleError({});
    expect(result).toEqual({ msg: 'Unauthorized' });
  });

  it('returns "Server error" for status 500', () => {
    vi.spyOn(apiError, 'getErrorMessage').mockReturnValue('Some error');
    vi.spyOn(apiError, 'getErrorStatus').mockReturnValue(500);

    const result = handleError({});
    expect(result).toEqual({ msg: 'Server error' });
  });

  it('returns "Server error" for other status codes', () => {
    vi.spyOn(apiError, 'getErrorMessage').mockReturnValue('Unknown error');
    vi.spyOn(apiError, 'getErrorStatus').mockReturnValue(404);

    const result = handleError({});
    expect(result).toEqual({ msg: 'Server error' });
  });

  it('returns "Server error" if message is undefined', () => {
    vi.spyOn(apiError, 'getErrorMessage').mockReturnValue('');
    vi.spyOn(apiError, 'getErrorStatus').mockReturnValue(400);

    const result = handleError({});
    expect(result).toEqual({ msg: 'Server error' });
  });
});
