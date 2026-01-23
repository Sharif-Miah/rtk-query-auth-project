/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface OrderProduct {
  id: number;
  quantity: number;
}

interface CreateOrderRequest {
  userId: number;
  products: OrderProduct[];
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, CreateOrderRequest>({
      query: (orderData) => ({
        url: 'carts/add',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = paymentApi;
