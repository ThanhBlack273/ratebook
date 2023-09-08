import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {RootState} from './store';
import {getSecureValue} from '../common/utils/keyChain';
import {userLoggedIn, userLoggedOut} from './auth';

interface IRefreshTokenRes {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://172.30.47.54:3000/api',
    prepareHeaders: async (headers, {getState, endpoint}) => {
        const token = (getState() as RootState).auth.accessToken || (await getSecureValue('accessToken'));

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const rateBookApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        const error = result?.error as any;
        if (error && error.status === 401 && error.data.error === 'Unauthorized!') {
            const refreshToken = await getSecureValue('refreshToken');
            const refreshTokenRes = await baseQuery(
                {
                    url: '/auth/refresh_token',
                    method: 'POST',
                    body: {refreshToken},
                },
                api,
                extraOptions,
            );
            if (refreshTokenRes?.error?.status === 401) {
                api.dispatch(userLoggedOut());
                result = refreshTokenRes;
            } else {
                const dataRes = refreshTokenRes as IRefreshTokenRes;
                api.dispatch(
                    userLoggedIn({
                        accessToken: dataRes.data.accessToken,
                        refreshToken: dataRes.data.refreshToken,
                    }),
                );
                result = await baseQuery(args, api, extraOptions);
            }
        }
        return result;
    },
    tagTypes: ['Books', 'Reviews', 'DetailBook'],
    keepUnusedDataFor: 0,
    endpoints: builder => ({}),
});
