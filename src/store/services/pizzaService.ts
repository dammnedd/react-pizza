import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {useAppSelector} from "../../hooks/redux.ts";
import {pizzaItem} from "../../types/main";
import {paramsTypes} from "../../types/params";


export const fetchPizza = createApi({
    reducerPath: 'fetchPizza',
    baseQuery: fetchBaseQuery({baseUrl: 'https://650ab658dfd73d1fab08bf7a.mockapi.io/pizzas'}),
    tagTypes: ['Pizza'],
    endpoints: (build) => ({
        fetchAllPizzas: build.query<pizzaItem[], paramsTypes>({
            query: ({sortProperty, type, limit, searchValue, page, categoryValue}) => ({
                url: '/',
                params: {
                    category: categoryValue ? categoryValue : '',
                    sortBy: sortProperty,
                    order: type,
                    search: searchValue,
                    page: page,
                    limit: limit,
                },
            }),
            providesTags: result => ['Pizza']
        }),
    })
})