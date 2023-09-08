import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from './auth';
import {rateBookApiSlice} from './rateBookApiSlice';
import {googleBookApiSlice} from './googleApiSlice';
import {catchErrorAPI} from './middleware';
import {bookSlice} from './books';
import {profileSlice} from './users';
import {firebaseApiSlice} from './FirebaseApiSlice';
import {notificationSlice} from './notifications';

export const store = configureStore({
    reducer: {
        [rateBookApiSlice.reducerPath]: rateBookApiSlice.reducer,
        [googleBookApiSlice.reducerPath]: googleBookApiSlice.reducer,
        [firebaseApiSlice.reducerPath]: firebaseApiSlice.reducer,
        auth: authSlice,
        book: bookSlice,
        profile: profileSlice,
        notification: notificationSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            rateBookApiSlice.middleware,
            googleBookApiSlice.middleware,
            firebaseApiSlice.middleware,
            catchErrorAPI,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
