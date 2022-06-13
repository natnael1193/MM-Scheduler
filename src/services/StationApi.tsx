import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Station } from "../interfaces/Station.interface"

const baseURL = `${process.env.REACT_APP_API_SERVER}`

export const stationApi = createApi({
  reducerPath: "stationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`
  }),
  tagTypes: ["Station", "Program"],
  endpoints: (builder) => ({
    stations: builder.query<Station[], void>({
      query: () => `/get_all_stations`,
      providesTags: ["Station"]
    }),
    station: builder.query<Station, string>({
      query: (id) => `/get_schedule_by_program/${id}`,
      // providesTags: ["Station"]
      providesTags: ["Station"]
    }),
    // programByStation: builder.query<Station, string>({
    //   query: (id) => `/get_programs_by_station/${id}`,
    //   // providesTags: ["Station"]
    //   providesTags: ["Station"]
    // }),
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
      invalidatesTags: ["Station", "Program"]
    })
  })
})
export const {
  useStationsQuery,
  useStationQuery,
  // useProgramByStationQuery,
  useAddStationMutation,
  useDeleteStationMutation,
  useUpdateStationMutation
} = stationApi;
