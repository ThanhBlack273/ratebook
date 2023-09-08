import {rateBookApiSlice} from '../rateBookApiSlice';
import {IAddNotiInput, IGetNotificationOutput} from './notificationsType';

const notificationApi = rateBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query<IGetNotificationOutput, number>({
            query: (page = 1) => `/action/notification?page=${page}`,
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            merge: (currentCache, newItems, {arg}) => {
                if (arg === 1) currentCache.notis = newItems.notis;
                else currentCache.notis.push(...newItems.notis);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg;
            },
        }),
        addNotification: builder.mutation<unknown, IAddNotiInput>({
            query: data => ({
                url: '/action/notification',
                method: 'POST',
                body: data,
            }),
        }),
        setIsSeen: builder.mutation<unknown, number>({
            query: id => ({
                url: `action/notification/${id}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {useGetNotificationsQuery, useAddNotificationMutation, useSetIsSeenMutation} = notificationApi;

export default notificationApi;
