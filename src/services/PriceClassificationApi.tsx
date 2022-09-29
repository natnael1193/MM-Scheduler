import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PriceClassification } from '../interfaces/PriceClassification.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const priceClassificationApi = createApi({
  reducerPath: 'priceClassificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = baseToken

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['PriceClassification'],
  endpoints: (builder) => ({
    priceClassifications: builder.query<PriceClassification[], void>({
      query: () => `/PriceClassification`,
      providesTags: ['PriceClassification'],
    }),
    priceClassification: builder.query<PriceClassification, string>({
      query: (id) => `PriceClassification/${id}`,
      providesTags: ['PriceClassification'],
    }),
    addPriceClassification: builder.mutation<void, PriceClassification>({
      query: (priceClassification) => ({
        url: '/PriceClassification',
        method: 'POST',
        body: priceClassification,
      }),
      invalidatesTags: ['PriceClassification'],
    }),
    updatePriceClassification: builder.mutation<void, PriceClassification>({
      query: ({ ...rest }) => ({
        url: `PriceClassification/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['PriceClassification'],
    }),
    deletePriceClassification: builder.mutation<void, string>({
      query: (id) => ({
        url: `PriceClassification/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PriceClassification'],
    }),
  }),
});

export const {
  usePriceClassificationsQuery,
  usePriceClassificationQuery,
  useAddPriceClassificationMutation,
  useUpdatePriceClassificationMutation,
  useDeletePriceClassificationMutation,
} = priceClassificationApi;
