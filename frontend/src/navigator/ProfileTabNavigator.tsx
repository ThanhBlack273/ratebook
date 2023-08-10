import {RouteProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import {ProfileTabParamList} from './ProfileTabNavigatorTypes';
import {FavoriteTab, RegisterTab, ReviewTab} from '../screens/profiles';
import {Text, View} from 'react-native';

const handleChooseColor = (
    route: RouteProp<ProfileTabParamList, keyof ProfileTabParamList>,
    // setBgColor: React.Dispatch<React.SetStateAction<string>>,
) => {
    if (route.name === 'ReviewTab') {
        // setBgColor('#fdffcd');
        return '#ffc93c';
    }
    if (route.name === 'RegisterTab') {
        // setBgColor('#e9fff0');
        return 'limegreen';
    }
    if (route.name === 'FavoriteTab') {
        // setBgColor(' #f76b8a');
        return '#f76b8a';
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
                tabBarIcon: () => {
                    if (route.name === 'ReviewTab') {
                        return <FontAwesome name="comments" color="gray" size={22} />;
                    } else if (route.name === 'RegisterTab') {
                        return <MaterialIcons name="assignment" color="gray" size={22} />;
                    } else if (route.name === 'FavoriteTab') {
                        return <Octicons name="feed-heart" color="gray" size={22} />;
                    }
                },
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
