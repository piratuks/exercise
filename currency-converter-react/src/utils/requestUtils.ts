import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { selectConfiguration } from 'state/configurationSlice';
import { RootState } from 'state/configureStore';

export const getConfig = (webApi: BaseQueryApi) => {
  const configuration = selectConfiguration(webApi.getState() as RootState);

  if (!configuration) {
    throw new Error('Configuration is not provided');
  }

  return configuration;
};

export const apiBaseQuery = (args: string | FetchArgs, webApi: BaseQueryApi, extraOptions: object) => {
  const config = getConfig(webApi);
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${config.apiEndpoint}`,
    prepareHeaders: headers => {
      return headers;
    }
  });

  return rawBaseQuery(args, webApi, extraOptions);
};
