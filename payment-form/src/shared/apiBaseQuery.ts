import { type BaseQueryApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const apiBaseQuery = (args: string | FetchArgs, webApi: BaseQueryApi, extraOptions: object) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: headers => {
      return headers;
    }
  });

  return rawBaseQuery(args, webApi, extraOptions);
};
