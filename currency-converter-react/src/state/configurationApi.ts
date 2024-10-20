import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface EnvConfig {
  environment: string;
  apiEndpoint: string;
}

export const configurationApi = createApi({
  reducerPath: 'configurationApi',
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    fetchConfiguration: builder.query<EnvConfig, void>({
      query: () => `config.json`
    })
  })
});

export const { useFetchConfigurationQuery } = configurationApi;
