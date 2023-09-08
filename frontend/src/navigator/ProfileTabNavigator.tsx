import {RouteProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import {ProfileTabParamList} from './ProfileTabNavigatorTypes';
import {FavoriteTab, RegisterTab, ReviewTab} from '../screens/profiles';

const handleChooseColor = (route: RouteProp<ProfileTabParamList, keyof ProfileTabParamList>) => {
    if (route.name === 'ReviewTab') return '#ffc93c';
    if (route.name === 'RegisterTab') return 'limegreen';
    if (route.name === 'FavoriteTab') return '#f76b8a';
};

const handleTabbarIcon = (
    route: RouteProp<ProfileTabParamList, keyof ProfileTabParamList>,
    focused: boolean,
) => {
    if (route.name === 'ReviewTab') {
        return <FontAwesome name="comments" color={focused ? 'white' : 'gray'} size={22} />;
    } else if (route.name === 'RegisterTab') {
        return <MaterialIcons name="assignment" color={focused ? 'white' : 'gray'} size={22} />;
    } else if (route.name === 'FavoriteTab') {
        return <Octicons name="feed-heart" color={focused ? 'white' : 'gray'} size={22} />;
    }
};

const Tab = createMaterialTopTabNavigator<ProfileTabParamList>();

const ProfileTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: {fontSize: 13, fontWeight: '600', flexDirection: 'row'},
                tabBarStyle: {
                    backgroundColor: handleChooseColor(route),
                },
                tabBarIcon: ({focused}) => handleTabbarIcon(route, focused),
                tabBarItemStyle: {flexDirection: 'row'},
            })}>
            <Tab.Screen
                name="ReviewTab"
                component={ReviewTab}
                options={{
                    title: 'Reviewed',
                }}
            />
            <Tab.Screen
                name="RegisterTab"
                component={RegisterTab}
                options={{
                    title: 'Registered',
                }}
            />
            <Tab.Screen
                name="FavoriteTab"
                component={FavoriteTab}
                options={{
                    title: 'Favorited',
                }}
            />
        </Tab.Navigator>
    );
};

export default ProfileTabNavigator;
