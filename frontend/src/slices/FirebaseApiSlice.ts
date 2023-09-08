import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://fcm.googleapis.com',
    prepareHeaders: async (headers, {getState, endpoint}) => {
        const token =
            'key=AAAA0klfozs:APA91bHYKo7j4nQpGoiaTLkh5jfv_QKq3X_4mPdXGo7yBIfiDEVMa9EkBWriXoxV-BleqzdIe7X8X3uekk15DsLX6eOLpFtTOiesS-NVL0_p984fH9YFb2Y2ye48XgdhTs5MpJExL8CO';
        // will put into env file in the future.

        if (token) {
            headers.set('Authorization', `${token}`);
        }
        return headers;
    },
});

export const firebaseApiSlice = createApi({
    reducerPath: 'FirebaseApi',
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
