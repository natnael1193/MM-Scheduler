import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Schedule } from '../interfaces/Schedule.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
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
  tagTypes: ['Schedule', 'Program'],
  endpoints: (builder) => ({
    schedules: builder.query<Schedule[], void>({
      query: () => `/Schedule`,
      providesTags: ['Schedule', 'Program'],
    }),
    schedule: builder.query<Schedule, string>({
      query: (id) => `/Schedule/${id}`,
      providesTags: ['Schedule', 'Program'],
    }),
    scheduleByProgam: builder.query<Schedule, string>({
      query: (id) => `/Program/${id}/Schedules`,
      providesTags: ['Schedule', 'Program'],
    }),
    addSchedule: builder.mutation<void, Schedule>({
      query: ({ ...rest }) => ({
        url: '/Schedule',
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Schedule', 'Program'],
    }),
    updateSchedule: builder.mutation<void, Schedule>({
      query: ({ ...rest }) => ({
        url: `Schedule/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Schedule', 'Program'],
    }),
    deleteSchedule: builder.mutation<void, string>({
      query: (id) => ({
        url: `Schedule/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
});

export const {
  useSchedulesQuery,
  useScheduleQuery,
  useScheduleByProgamQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;
