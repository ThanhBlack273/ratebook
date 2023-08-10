import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';

import {DrawerParamList} from './DrawerNavigatorTypes';
import StackNavigator from './StackNavigator';
import {CustomDrawerContent} from '../common/components';
import {getSecureValue} from '../common/utils/keyChain';
import {userLoggedIn} from '../slices/auth';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const hanldeKeyChain = async () => {
            const accessToken = await getSecureValue('accessToken');
            const refreshToken = await getSecureValue('refreshToken');
            const user = await getSecureValue('user');
            if (accessToken && refreshToken && user)
                dispatch(userLoggedIn({accessToken, refreshToken, user: JSON.parse(user)}));
        };
        hanldeKeyChain();
    }, []);
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Home"
                component={StackNavigator}
                options={{
                    drawerIcon: () => <Entypo size={20} name="home" color="#1E90FF" />,
                    header: () => null,
                }}
            />
            <Drawer.Screen
                name="About"
                component={StackNavigator}
                options={{
                    drawerIcon: () => <Entypo size={20} name="info-with-circle" color="#1E90FF" />,
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
