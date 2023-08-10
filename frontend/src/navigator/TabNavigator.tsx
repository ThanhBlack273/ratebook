import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from 'react-native';

import {HomeTabParamList} from './TabNavigatorTypes';
import {RegisteredBookTab, ReviewBookTab} from '../screens/home';

const Tab = createMaterialTopTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'lightcyan',
                },
            }}>
            <Tab.Screen
                name="RegisteredBook"
                component={RegisteredBookTab}
                options={{
                    title: 'Registered book',
                }}
            />
            <Tab.Screen
                name="ReviewBook"
                component={ReviewBookTab}
                options={{
                    title: 'Review book',
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeTabNavigator;
