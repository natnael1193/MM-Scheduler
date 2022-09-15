import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PriceCategory } from '../interfaces/PriceCategory.interface';

const baseURL = `${process.env.REACT_APP_API_SERVER}`

export const priceCategoryApi = createApi({
    reducerPath: "priceCategoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`
    }),
    tagTypes: ["PriceCategory"],
    endpoints: (builder) => ({
        priceCategories: builder.query<PriceCategory[], void>({
            query: () => `/PriceCategory`,
            providesTags: ["PriceCategory"]
        }),
        priceCategory: builder.query<PriceCategory, string>({
            query: (id) => `PriceCategory/${id}`,
            providesTags: ["PriceCategory"]
        }),
        addPriceCategory: builder.mutation<void, PriceCategory>({
            query: (priceCategory) => ({
                url: '/PriceCategory',
                method: "POST",
                body: priceCategory
            }),
            invalidatesTags: ["PriceCategory"]
        }),
        updatePriceCategory: builder.mutation<void, PriceCategory>({
            query: ({ ...rest }) => ({
                url: `PriceCategory/${rest.id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PriceCategory"]
        }),
        deletePriceCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `PriceCategory/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PriceCategory']
        })
    })
})

export const {
    usePriceCategoriesQuery,
    usePriceCategoryQuery,
    useAddPriceCategoryMutation,
    useUpdatePriceCategoryMutation,
    useDeletePriceCategoryMutation

} = priceCategoryApi