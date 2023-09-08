import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StackParamList} from './StackNavigatorTypes';
import {SignInScreen} from '../screens/signin';
import {SignUpScreen} from '../screens/signup';
import {Header} from '../common/components';
import {ForgotPasswordScreen} from '../screens/forgotPassword';
import ResetPasswordScreen from '../screens/forgotPassword/ResetPasswordScreen';
import HomeTabNavigator from './TabNavigator';
import HomeHeader from '../screens/home/HomeHeader';
import {SearchScreen} from '../screens/search';
import {RegisterBookScreen} from '../screens/registerBook';
import {DetailScreen} from '../screens/detail';
import {ImageCarouselScreen} from '../screens/imagesCarousel.tsx';
import {ProfileScreen} from '../screens/profiles';
import NotificationScreen from '../screens/notification/NotificationScreen';
import {RootState} from '../slices/store';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
    const {accessToken} = useSelector((state: RootState) => state.auth);
    return (
        <Stack.Navigator>
            {!accessToken ? (
                <>
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{
                            title: 'SIGN IN',
                            header: props => <Header {...props} isNavigation={false} />,
                        }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{
                            title: 'SIGN UP',
                            header: props => <Header {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={{
                            title: 'FORGOT PASSWORD',
                            header: props => <Header {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ResetPasswordScreen}
                        options={{
                            title: 'RESET PASSWORD',
                            header: props => <Header {...props} />,
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Books"
                        component={HomeTabNavigator}
                        options={{
                            title: 'Books',
                            header: props => <HomeHeader {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{
                            title: 'SEARCH',
                            header: props => <Header {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="RegisterBook"
                        component={RegisterBookScreen}
                        options={{
                            title: 'REGISTER BOOK',
                            header: props => <Header {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={DetailScreen}
                        options={{
                            title: 'DETAIL BOOK',
                            header: props => <Header {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="ImageCarousel"
                        component={ImageCarouselScreen}
                        options={{
                            title: 'Images',
                            header: props => <Header {...props} style={{backgroundColor: '#505050'}} />,
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            header: () => null,
                        }}
                    />
                    <Stack.Screen
                        name="Notification"
                        component={NotificationScreen}
                        options={{
                            title: 'Notification',
                            header: props => <Header {...props} />,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};
export default StackNavigator;
