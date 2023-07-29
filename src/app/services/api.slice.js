import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService';
const apiUrl = import.meta.env.VITE_APP_API_URL;
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    tagTypes: ["Products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api/products` }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query({
            query: (page) => `?populate=*&pagination[${page}]=1&pagination[pageSize]=7`,
            providesTags: (result) =>
                result
                    ? [...result.data.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${CookieService.get('jwt')}`,
                    }
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }],
        }),
        updateProduct: builder.mutation({
            query(data){
                const { id, ...body } = data
                return {
                    url: `/${id}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${CookieService.get('jwt')}`,
                    },
                    body
                } 
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }],
        })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPaginatedProductsQuery, useDeleteProductMutation, useUpdateProductMutation } = pokemonApi