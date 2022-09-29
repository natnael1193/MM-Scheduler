import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrganizationType } from '../interfaces/OrganizationType.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const organizationTypeApi = createApi({
  reducerPath: 'organizationTypeApi',
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
