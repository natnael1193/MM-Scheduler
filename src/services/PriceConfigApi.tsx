import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PriceConfig } from '../interfaces/PriceConfig.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const priceConfigApi = createApi({
    reducerPath: "priceConfigApi",
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
    tagTypes: ["PriceConfig"],
    endpoints: (builder) => ({
        priceConfigs: builder.query<PriceConfig[], void>({
            query: () => `/PriceConfig`,
            providesTags: ["PriceConfig"]
        }),
        priceConfig: builder.query<PriceConfig, string>({
            query: (id) => `PriceConfig/${id}`,
            providesTags: ["PriceConfig"]
        }),
        addPriceConfig: builder.mutation<void, PriceConfig>({
            query: (priceConfig) => ({
                url: '/PriceConfig',
                method: "POST",
                body: priceConfig
            }),
            invalidatesTags: ["PriceConfig"]
        }),
        updatePriceConfig: builder.mutation<void, PriceConfig>({
            query: ({ ...rest }) => ({
                url: `PriceConfig/${rest.id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PriceConfig"]
        }),
        deletePriceConfig: builder.mutation<void, string>({
            query: (id) => ({
                url: `PriceConfig/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PriceConfig']
        })
    })
})

export const {
    usePriceConfigsQuery,
    usePriceConfigQuery,
    useAddPriceConfigMutation,
    useUpdatePriceConfigMutation,
    useDeletePriceConfigMutation

} = priceConfigApi