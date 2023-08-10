import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://172.30.47.54:3000/api',
    prepareHeaders: async (headers, {getState, endpoint}) => {
        const token =
            (getState() as RootState).auth.accessToken ||
            (await AsyncStorage.getItem('accessToken'));
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const rateBookApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            // do something
        }
        return result;
    },
    endpoints: builder => ({}),
});
