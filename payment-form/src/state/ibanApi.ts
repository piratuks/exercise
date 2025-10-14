import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ibanApi = createApi({
  reducerPath: 'ibanApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_IBAN_API_URL }),
  endpoints: builder => ({
    validateIban: builder.query<{ valid: boolean; iban: string }, string>({
      query: iban => `validate/?iban=${iban}`
    })
  })
});

export const { useLazyValidateIbanQuery } = ibanApi;
