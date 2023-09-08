export {usePushNotificationsMutation, usePushMultiNotificationsMutation} from './FirebaseApi';
export {
    default as notificationApi,
    useGetNotificationsQuery,
    useAddNotificationMutation,
    useSetIsSeenMutation,
} from './notificationApi';

export {
    default as notificationSlice,
    inceateActiveNotisCount,
    setActiveNotisCount,
    resetActiveNotisCount,
} from './noticationSlice';

export type {INotification} from './notificationsType';
