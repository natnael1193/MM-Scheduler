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
            query: () => `/get_all_price_categories`,
            providesTags: ["PriceCategory"]
        }),
        priceCategory: builder.query<PriceCategory, string>({
            query: (id) => `get_price_category_by_id/${id}`,
            providesTags: ["PriceCategory"]
        }),
        addPriceCategory: builder.mutation<void, PriceCategory>({
            query: (priceCategory) => ({
                url: '/create_price_category',
                method: "POST",
                body: priceCategory
            }),
            invalidatesTags: ["PriceCategory"]
        }),
        updatePriceCategory: builder.mutation<void, PriceCategory>({
            query: ({ id, ...rest }) => ({
                url: `update_price_category/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PriceCategory"]
        }),
        deletePriceCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `remove_price_category/${id}`,
                method: 'PUT'
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