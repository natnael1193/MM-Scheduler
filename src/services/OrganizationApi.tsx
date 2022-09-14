import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Organization } from 'src/interfaces/Organization.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;

export const organizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNpY3VzZXIiLCJqdGkiOiI5ZTlhNWE5OC01OTM3LTRjYmUtODk2MS1hY2YyZjE3OGU3ZTQiLCJlbWFpbCI6ImJhc2ljdXNlckBhaGYuY29tIiwidWlkIjoiMzFlNTQyZDItY2E1Ny00YjhlLTkxMDgtM2U0MjI4ODUzZmJmIiwiaXAiOiIxOTIuMTY4LjAuMjQxIiwicm9sZXMiOiJCYXNpYyIsImV4cCI6MTY2MzE0NDIwNSwiaXNzIjoiQ29yZUlkZW50aXR5IiwiYXVkIjoiQ29yZUlkZW50aXR5VXNlciJ9.f6Y0AcJ_Mk1Q1kk-9Ql5fnKtb9v_WuR9fPJLS8tyjbY'

    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }

    //   return headers
    // },
  }),
  tagTypes: ['Organization'],
  endpoints: (builder) => ({
    organizations: builder.query<Organization[], void>({
      query: () => `/Organization`,
      providesTags: ['Organization'],
    }),
    organization: builder.query<Organization, string>({
      query: (id) => `/Organization/${id}`,
      providesTags: ['Organization'],
    }),
    addOrganization: builder.mutation<void, Organization>({
      query: (station) => ({
        url: `/Organization`,
        method: 'POST',
        body: station,
      }),
      invalidatesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation<void, Organization>({
      query: ({ ...rest }) => ({
        url: `/Organization/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Organization/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization'],
    }),
  }),
});
export const {
  useOrganizationsQuery,
  useOrganizationQuery,
  useAddOrganizationMutation,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
} = organizationApi;
