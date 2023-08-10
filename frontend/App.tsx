import 'react-native-gesture-handler';

import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ErrorBoundary} from 'react-error-boundary';

import {DrawerNavigator} from './src/navigator';
import {store} from './src/slices/store';
import {ToastStyle} from './src/common/components';
import {fallbackRender} from './src/screens/error';

//Ignore all log notifications
LogBox.ignoreAllLogs();

function App(): JSX.Element {
    return (
        <ErrorBoundary fallbackRender={fallbackRender}>
            <Provider store={store}>
                <NavigationContainer>
                    <DrawerNavigator />
                </NavigationContainer>
                <ToastStyle />
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
