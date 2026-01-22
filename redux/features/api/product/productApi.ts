import { apiSlice } from "../apiSlice";


export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProductsQuery } = productApi;