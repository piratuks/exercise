import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { Countries, EmailProviders, Gender } from 'app/constant';
import { apiBaseQuery } from 'utils/requestUtils';
import { FormDynamicField } from './formSlice';
import { StatusCode } from './statusCode';

export interface EnvConfig {
  environment: string;
  apiEndpoint: string;
  apiVersionPrefix: string;
  version: string;
}
export interface UserCRUDApiError<Data> {
  status: number;
  data: CRUDUserResponse & Data;
}
interface CRUDUserResponse {
  operationResult: string | null;
  statusCode: StatusCode;
  message: string;
}
interface SaveUserPayload {
  username: string;
  age: number;
  country: Countries;
  gender: Gender;
  containsEmails: EmailProviders[];
  dynamicFields: FormDynamicField[];
}
export const formApi = createApi({
  reducerPath: 'formApi',
  tagTypes: [],
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    saveUser: builder.mutation<CRUDUserResponse, SaveUserPayload>({
      query: body => ({
        url: `users`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useSaveUserMutation } = formApi;
