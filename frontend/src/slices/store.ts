import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from './auth';
import {rateBookApiSlice} from './rateBookApiSlice';
import {googleBookApiSlice} from './googleApiSlice';
import {catchErrorAPI} from './middleware';
import {bookSlice} from './books';
import {profileSlice} from './users';

export const store = configureStore({
    reducer: {
        [rateBookApiSlice.reducerPath]: rateBookApiSlice.reducer,
        [googleBookApiSlice.reducerPath]: googleBookApiSlice.reducer,
        auth: authSlice,
        book: bookSlice,
        profile: profileSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            rateBookApiSlice.middleware,
            googleBookApiSlice.middleware,
            catchErrorAPI,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
