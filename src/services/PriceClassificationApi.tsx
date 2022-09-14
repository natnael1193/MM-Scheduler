import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PriceClassification } from '../interfaces/PriceClassification.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`

export const priceClassificationApi = createApi({
    reducerPath: "priceClassificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`
    }),
    tagTypes: ["PriceClassification"],
    endpoints: (builder) => ({
        priceClassifications: builder.query<PriceClassification[], void>({
            query: () => `/get_all_price_classification`,
            providesTags: ["PriceClassification"]
        }),
        priceClassification: builder.query<PriceClassification, string>({
            query: (id) => `get_price_classification_by_id/${id}`,
            providesTags: ["PriceClassification"]
        }),
        addPriceClassification: builder.mutation<void, PriceClassification>({
            query: (priceClassification) => ({
                url: '/create_price_classification_config_and_property',
                method: "POST",
                body: priceClassification
            }),
            invalidatesTags: ["PriceClassification"]
        }),
        updatePriceClassification: builder.mutation<void, PriceClassification>({
            query: ({ id, ...rest }) => ({
                url: `update_price_classification/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PriceClassification"]
        }),
        deletePriceClassification: builder.mutation<void, string>({
            query: (id) => ({
                url: `remove_price_classification/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['PriceClassification']
        })
    })
})

export const {
    usePriceClassificationsQuery,
    usePriceClassificationQuery,
    useAddPriceClassificationMutation,
    useUpdatePriceClassificationMutation,
    useDeletePriceClassificationMutation

} = priceClassificationApi