import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Organization } from 'src/interfaces/Organization.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const baseToken = `${process.env.REACT_APP_API_TOKEN}`;

export const organizationApi = createApi({
  reducerPath: 'organizationApi',
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
