import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../shared/apiBaseQuery';

export interface Account {
  iban: string;
  id: string;
  balance: number;
}

export type ErrorObject = {
  [key: string]: unknown;
};

export interface AccountsResponse {
  status: number;
  message?: string;
  data: Account[];
  error: ErrorObject;
}

export type AccountsRequest = unknown;

export interface ProcessPaymentRequest {
  payerAccount: string;
  receiverAccount: string;
  amount: number;
  receiver: string;
  purpose: string;
}

export interface ProcessPaymentResponse {
  status: number;
  message?: string;
  data: unknown;
  error: ErrorObject;
}

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Accounts'],
  endpoints: builder => ({
    getUserAccountsData: builder.query<AccountsResponse, AccountsRequest>({
      query: () => ({
        url: `v1/user/retrieve_accounts`,
        method: 'GET',
        credentials: 'include'
      }),
      providesTags: ['Accounts']
    }),
    processPayment: builder.mutation<ProcessPaymentResponse, ProcessPaymentRequest>({
      query: data => ({
        url: 'v1/user/process_payment',
        method: 'POST',
        body: {
          ...data
        }
      }),
      invalidatesTags: ['Accounts']
    })
  })
});

export const { useGetUserAccountsDataQuery, useProcessPaymentMutation } = accountsApi;
