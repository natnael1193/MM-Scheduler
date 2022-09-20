import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Station } from '../interfaces/Station.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const baseToken = `${process.env.REACT_APP_API_TOKEN}`;

export const stationApi = createApi({
  reducerPath: 'stationApi',
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
  refetchOnMountOrArgChange: 30,
  tagTypes: ['Station', 'Program'],
  endpoints: (builder) => ({
    stations: builder.query<Station[], void>({
      query: () => `/Station`,
      providesTags: ['Station', "Program"]
    }),
    station: builder.query<Station, string>({
      query: (id) => `/Station/${id}`,
      // providesTags: ["Station"]
      providesTags: ['Station'],
    }),
    // programByStation: builder.query<Station, string>({
    //   query: (id) => `/get_programs_by_station/${id}`,
    //   // providesTags: ["Station"]
    //   providesTags: ["Station"]
    // }),
    addStation: builder.mutation<void, Station>({
      query: (station) => ({
        url: `/Station`,
        method: 'POST',
        body: station,
      }),
      invalidatesTags: ['Station'],
    }),
    updateStation: builder.mutation<void, Station>({
      query: ({ ...rest }) => ({
        url: `/Station/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Station'],
    }),
    deleteStation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Station/${id}`,
      method: 'DELETE',
      }),
      invalidatesTags: ['Station', 'Program'],
    }),
  }),
});
export const {
  useStationsQuery,
  useStationQuery,
  // useProgramByStationQuery,
  useAddStationMutation,
  useDeleteStationMutation,
  useUpdateStationMutation,
} = stationApi;
