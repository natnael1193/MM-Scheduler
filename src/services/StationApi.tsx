import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Station } from "../interfaces/Station.interface"

const baseURL = `${process.env.REACT_APP_API_SERVER}`

export const stationApi = createApi({
  reducerPath: "stationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`
  }),
  tagTypes: ["Station"],
  endpoints: (builder) => ({
    stations: builder.query<Station[], void>({
      query: () => `/get_all_stations`,
      providesTags: ["Station"]
    }),
    station: builder.query<Station, string>({
      query: (id) => `/get_station_by_id/${id}`,
      // providesTags: ["Station"]
      providesTags: ["Station"]
    }),
    addStation: builder.mutation<void, Station>({
      query: (station) => ({
        url: `/create_station`,
        method: "POST",
        body: station
      }),
      invalidatesTags: ["Station"]
    }),
    updateStation: builder.mutation<void, Station>({
      query: ({ id, ...rest }) => ({
        url: `/update_station/${id}`,
        method: "PUT",
        body: rest
      }),
      invalidatesTags: ["Station"]
    }),
    deleteStation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/remove_station/${id}`,
        method: "PUT"
      }),
      invalidatesTags: ["Station"]
    })
  })
})
export const {
  useStationsQuery,
  useStationQuery,
  useAddStationMutation,
  useDeleteStationMutation,
  useUpdateStationMutation
} = stationApi;
