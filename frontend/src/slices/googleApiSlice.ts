import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/',
    prepareHeaders: async (headers, {getState, endpoint}) => {
        // do something
        return headers;
    },
});

export const googleBookApiSlice = createApi({
    reducerPath: 'GGApi',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            // do something
        }
        return result;
    },
    keepUnusedDataFor: 0,
    endpoints: builder => ({}),
});
