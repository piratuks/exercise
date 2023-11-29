import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { selectConfiguration } from 'state/configurationSlice';
import { RootState } from 'state/configureStore';

export const apiBaseQuery = (args: string | FetchArgs, webApi: BaseQueryApi, extraOptions: object) => {
  const configuration = selectConfiguration(webApi.getState() as RootState);

  if (!configuration) {
    throw new Error('Configuration is not provided');
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${configuration.apiEndpoint}/${configuration.apiVersionPrefix}`,
    prepareHeaders: headers => {
      return headers;
    }
  });

  return rawBaseQuery(args, webApi, extraOptions);
};
