import {Linking, PermissionsAndroid} from 'react-native';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {store} from '../../slices/store';
import {inceateActiveNotisCount, setActiveNotisCount} from '../../slices/notifications';
import {getSecureValue, setSecureValue} from './keyChain';

export const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
    if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
};

export const handleFCMMessage = (message: FirebaseMessagingTypes.RemoteMessage) => {
    setTimeout(() => {
        if (message.data?.deepLink) {
            Linking.openURL(message.data?.deepLink);
        }
<<<<<<< HEAD
    }, 500);
=======
    }, 2000);
>>>>>>> origin/frontend_detail_page
};

export const notificationListener = async () => {
    messaging().onNotificationOpenedApp((message: FirebaseMessagingTypes.RemoteMessage) => {
        handleFCMMessage(message);
    });

    const message = await messaging().getInitialNotification();
    if (message) handleFCMMessage(message);
};

export const getDevideToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return token;
};

export const handleFCMInForeground = (message: FirebaseMessagingTypes.RemoteMessage) => {
    store.dispatch(inceateActiveNotisCount());
};

export const handleBackgroundMessageHandler = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    const activeNotisCount = await getSecureValue('activeNotisCount');
    if (activeNotisCount) await setSecureValue('activeNotisCount', String(Number(activeNotisCount) + 1));
    else await setSecureValue('activeNotisCount', '1');
};
<<<<<<< HEAD

export const handleGetActiveNotisCount = async () => {
    const activeNotisCount = await getSecureValue('activeNotisCount');
    store.dispatch(setActiveNotisCount(Number(activeNotisCount)));
};
=======
>>>>>>> origin/frontend_detail_page
