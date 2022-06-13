import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Program } from '../interfaces/Program.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`

export const programApi = createApi({
    reducerPath: "programApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`
    }),
    tagTypes: ["Program"],
    endpoints: (builder) => ({
        programs: builder.query<Program[], void>({
            query: () => `/get_all_programs`,
            providesTags: ["Program"]
        }),
        program: builder.query<Program, string>({
            query: (id) => `get_program_by_id/${id}`,
            providesTags: ["Program"]
        }),
        programByStation: builder.query<Program, string>({
            query: (id) => `/get_programs_by_station/${id}`,
            providesTags: ["Program"]
        }),
        addProgram: builder.mutation<void, Program>({
            query: (program) => ({
                url: '/create_program',
                method: "POST",
                body: program
            }),
            invalidatesTags: ["Program"]
        }),
        updateProgram: builder.mutation<void, Program>({
            query: ({ id, ...rest }) => ({
                url: `update_program/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Program"]
        }),
        deleteProgram: builder.mutation<void, string>({
            query: (id) => ({
                url: `remove_program/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Program']
        })
    })
})

export const {
    useProgramsQuery,
    useProgramQuery,
    useProgramByStationQuery,
    useAddProgramMutation,
    useUpdateProgramMutation,
    useDeleteProgramMutation

} = programApi