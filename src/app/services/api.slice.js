import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiUrl = import.meta.env.VITE_APP_API_URL;
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    tagTypes: ["Products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl:`${apiUrl}/api/products?populate=*` }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query({
            query: (page) => `&pagination[${page}]=1&pagination[pageSize]=7`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPaginatedProductsQuery } = pokemonApi