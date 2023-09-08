import 'react-native-gesture-handler';

import {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ErrorBoundary} from 'react-error-boundary';
import {MenuProvider} from 'react-native-popup-menu';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {DrawerNavigator} from './src/navigator';
import {RootState, store} from './src/slices/store';
import {CustomModal, ToastStyle} from './src/common/components';
import {fallbackRender} from './src/screens/error';
import {dynamicLinksListener, handleDynamicLink} from './src/common/utils/dynamicLink';
import {
    handleBackgroundMessageHandler,
    handleFCMInForeground,
    notificationListener,
    requestUserPermission,
} from './src/common/utils/FCM';
import {LINKING} from './src/common/constants';

//Ignore all log notifications
LogBox.ignoreAllLogs();

// Register background handler
messaging().setBackgroundMessageHandler(handleBackgroundMessageHandler);

function App(): JSX.Element {
    useEffect(() => {
        requestUserPermission();
        dynamicLinksListener();
        notificationListener();
        const unsubscribeDL = dynamicLinks().onLink(handleDynamicLink);
        const unsubscribeFCM = messaging().onMessage(handleFCMInForeground);

        return () => {
            unsubscribeDL();
            unsubscribeFCM();
        };
    }, []);

    return (
        <ErrorBoundary fallbackRender={fallbackRender}>
            <Provider store={store}>
                <MenuProvider>
                    <NavigationContainer linking={LINKING}>
                        <DrawerNavigator />
                    </NavigationContainer>
                    <ToastStyle />
                    <CustomModal />
                </MenuProvider>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
