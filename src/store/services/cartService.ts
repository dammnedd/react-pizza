import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {pizzaItem} from "../../types/main";


export const fetchCart = createApi({
    reducerPath: 'fetchCart',
    baseQuery: fetchBaseQuery({baseUrl: 'https://650ab658dfd73d1fab08bf7a.mockapi.io/cart'}),
    tagTypes: ['Cart'],
    endpoints: (build) => ({
        addToCart: build.mutation<pizzaItem, pizzaItem>({
            query: (cartItem) => ({
                url: '/',
                method: 'POST',
                body: cartItem,
            }),
            invalidatesTags: result => ['Cart']
        }),
        getCart: build.query<pizzaItem[], void>({
            query: () => ({
                url: '/',
            }),
            providesTags: result => ['Cart']
        }),
        deleteCart: build.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: result => ['Cart']
        }),
        deleteCartItem: build.mutation<pizzaItem, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: result => ['Cart']
        }),
        updateCartItem: build.mutation<pizzaItem[], pizzaItem>({
            query: (cartItem) => ({
                url: `/${cartItem.id}`,
                method: 'PUT',
                body: cartItem,
            }),
            invalidatesTags: result => ['Cart']
        })
    })
})