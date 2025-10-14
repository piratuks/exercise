// apiBaseQuery.test.ts
import { fetchBaseQuery, type BaseQueryApi } from '@reduxjs/toolkit/query';
import { afterAll, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { apiBaseQuery } from '../shared/apiBaseQuery';

// Mock fetchBaseQuery
vi.mock('@reduxjs/toolkit/query', () => ({
  ...vi.importActual('@reduxjs/toolkit/query'),
  fetchBaseQuery: vi.fn(() => vi.fn())
}));

describe('apiBaseQuery', () => {
  const OLD_ENV = process.env;
  const webApi: BaseQueryApi = {
    dispatch: vi.fn(),
    getState: vi.fn(),
    extra: undefined,
    endpoint: 'test-endpoint',
    type: 'query',
    forced: false,
    signal: new AbortController().signal,
    abort: () => {}
  };

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV, VITE_API_URL: 'http://localhost:3000' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('calls fetchBaseQuery with correct baseUrl and headers', async () => {
    const mockRawBaseQuery = vi.fn().mockResolvedValue({ data: 'ok' });
    (fetchBaseQuery as unknown as Mock<typeof fetchBaseQuery>).mockReturnValue(mockRawBaseQuery);

    const args = '/test';

    const extraOptions = { foo: 'bar' };

    const result = await apiBaseQuery(args, webApi, extraOptions);

    expect(fetchBaseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: expect.any(Function)
      })
    );

    expect(mockRawBaseQuery).toHaveBeenCalledWith(args, webApi, extraOptions);

    expect(result).toEqual({ data: 'ok' });
  });
});
