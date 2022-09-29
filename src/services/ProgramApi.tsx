import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Program } from '../interfaces/Program.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const programApi = createApi({
  reducerPath: 'programApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = baseToken;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Program', 'Station'],
  endpoints: (builder) => ({
    programs: builder.query<Program[], void>({
      query: () => `/Program`,
      providesTags: ['Program', 'Station'],
    }),
    program: builder.query<Program, string>({
      query: (id) => `Program/${id}`,
      providesTags: ['Program'],
    }),
    programByStation: builder.query<Program, string>({
      query: (id) => `/Station/${id}`,
      providesTags: ['Program'],
    }),
    addProgram: builder.mutation<void, Program>({
      query: (program) => ({
        url: '/Program',
        method: 'POST',
        body: program,
      }),
      invalidatesTags: ['Program', 'Station'],
    }),
    updateProgram: builder.mutation<void, Program>({
      query: ({ ...rest }) => ({
        url: `Program/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Program'],
    }),
    deleteProgram: builder.mutation<void, string>({
      query: (id) => ({
        url: `Program/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Program'],
    }),
  }),
});

export const {
  useProgramsQuery,
  useProgramQuery,
  useProgramByStationQuery,
  useAddProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} = programApi;
