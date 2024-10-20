import { createApi } from '@reduxjs/toolkit/query/react';
import { CurrencyKey } from 'app/currency';
import { apiBaseQuery } from 'utils/requestUtils';

export interface RateRequest {
  from: CurrencyKey;
  to: CurrencyKey;
  amount: number;
}

export interface RateResponse {
  from: CurrencyKey;
  to: CurrencyKey;
  rate: number;
  fromAmount: number;
  toAmount: number;
}

export const ratesApi = createApi({
  reducerPath: 'ratesApi',
  tagTypes: [],
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    fetchRates: builder.query<RateResponse, RateRequest>({
      query: data => `fx-rates?from=${data.from}&to=${data.to}&amount=${data.amount}`,
      keepUnusedDataFor: 0
    })
  })
});

export const { useFetchRatesQuery } = ratesApi;
