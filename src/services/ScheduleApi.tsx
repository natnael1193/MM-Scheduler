import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Schedule } from '../interfaces/Schedule.interface';


const baseURL = `${process.env.REACT_APP_API_SERVER}`

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`
    }),
    tagTypes: ["Schedule", "Program"],
    endpoints: (builder) => ({
        schedules: builder.query<Schedule[], void>({
            query: () => `/get_all_schedules`,
            providesTags: ["Schedule", "Program"]
        }),
        schedule: builder.query<Schedule, string>({
            query: (id) => `/get_schedule_by_id/${id}`,
            providesTags: ["Schedule", "Program"]
        }),
        scheduleByProgam: builder.query<Schedule, string>({
            query: (id) => `/get_schedule_by_program/${id}`,
            providesTags: ["Schedule", "Program"]
        }),
        addSchedule: builder.mutation<void, Schedule>({
            query: (program) => ({
                url: '/create_program_schedule',
                method: "POST",
                body: program
            }),
            invalidatesTags: ["Schedule", "Program"]
        }),
        updateSchedule: builder.mutation<void, Schedule>({
            query: ({ id, ...rest }) => ({
                url: `update_schedule/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Schedule", "Program"]
        }),
        deleteSchedule: builder.mutation<void, string>({
            query: (id) => ({
                url: `remove_schedule/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ["Schedule"]
        })
    })
})

export const {
    useSchedulesQuery,
    useScheduleQuery,
    useScheduleByProgamQuery,
    useAddScheduleMutation,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation

} = scheduleApi