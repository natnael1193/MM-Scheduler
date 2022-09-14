import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrganizationType } from '../interfaces/OrganizationType.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;

export const organizationTypeApi = createApi({
  reducerPath: 'organizationTypeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    // prepareHeaders: (headers, { getState }) => {
    //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNpY3VzZXIiLCJqdGkiOiI5ZTlhNWE5OC01OTM3LTRjYmUtODk2MS1hY2YyZjE3OGU3ZTQiLCJlbWFpbCI6ImJhc2ljdXNlckBhaGYuY29tIiwidWlkIjoiMzFlNTQyZDItY2E1Ny00YjhlLTkxMDgtM2U0MjI4ODUzZmJmIiwiaXAiOiIxOTIuMTY4LjAuMjQxIiwicm9sZXMiOiJCYXNpYyIsImV4cCI6MTY2MzE0NDIwNSwiaXNzIjoiQ29yZUlkZW50aXR5IiwiYXVkIjoiQ29yZUlkZW50aXR5VXNlciJ9.f6Y0AcJ_Mk1Q1kk-9Ql5fnKtb9v_WuR9fPJLS8tyjbY'

    //     // If we have a token set in state, let's assume that we should be passing it.
    //     if (token) {
    //       headers.set('authorization', `Bearer ${token}`)
    //     }

    //     return headers
    //   },
  }),
  tagTypes: ['OrganizationType'],
  endpoints: (builder) => ({
    organizationTypes: builder.query<OrganizationType[], void>({
      query: () => `/OrganizationType`,
      providesTags: ['OrganizationType'],
    }),
    organizationType: builder.query<OrganizationType, string>({
      query: (id) => `OrganizationType/${id}`,
      providesTags: ['OrganizationType'],
    }),
    addOrganizationType: builder.mutation<void, OrganizationType>({
      query: (priceCategory) => ({
        url: '/OrganizationType',
        method: 'POST',
        body: priceCategory,
      }),
      invalidatesTags: ['OrganizationType'],
    }),
    updateOrganizationType: builder.mutation<void, OrganizationType>({
      query: ({ id, name, key }) => ({
        url: `OrganizationType/${id}`,
        method: 'PUT',
        body: { id, name, key },
      }),
      invalidatesTags: ['OrganizationType'],
    }),
    deleteOrganizationType: builder.mutation<void, string>({
      query: (id) => ({
        url: `OrganizationType/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OrganizationType'],
    }),
  }),
});

export const {
  useOrganizationTypesQuery,
  useOrganizationTypeQuery,
  useAddOrganizationTypeMutation,
  useUpdateOrganizationTypeMutation,
  useDeleteOrganizationTypeMutation,
} = organizationTypeApi;
