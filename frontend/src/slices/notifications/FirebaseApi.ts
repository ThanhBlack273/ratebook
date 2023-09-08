import {firebaseApiSlice} from '../FirebaseApiSlice';
import {IPushMultiNotificationInput, IPushNotificationInput} from './notificationsType';

const firebaseApi = firebaseApiSlice.injectEndpoints({
    endpoints: builder => ({
        pushNotifications: builder.mutation<unknown, IPushNotificationInput>({
            query: data => ({
                url: '/fcm/send',
                method: 'POST',
                body: data,
            }),
        }),
        pushMultiNotifications: builder.mutation<unknown, IPushMultiNotificationInput>({
            query: data => ({
                url: '/fcm/send',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {usePushNotificationsMutation, usePushMultiNotificationsMutation} = firebaseApi;

export default firebaseApi;
