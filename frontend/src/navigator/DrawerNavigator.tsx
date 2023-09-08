import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

import {DrawerParamList} from './DrawerNavigatorTypes';
import StackNavigator from './StackNavigator';
import {CustomDrawerContent} from '../common/components';
import {getSecureValue} from '../common/utils/keyChain';
import {userLoggedIn} from '../slices/auth';
import {RootState} from '../slices/store';
import {HomeNavigationProp} from './StackNavigatorTypes';
import {UpdateUserScreen} from '../screens/updateUser';
import {AboutScreen} from '../screens/about';
import {ChangePasswordScreen} from '../screens/changePassword';
import {setActiveNotisCount} from '../slices/notifications';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
    const {accessToken} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation<HomeNavigationProp>();

    useEffect(() => {
        const hanldeKeyChain = async () => {
            const accessToken = await getSecureValue('accessToken');
            const refreshToken = await getSecureValue('refreshToken');
            const user = await getSecureValue('user');
            if (accessToken && refreshToken && user)
                dispatch(userLoggedIn({accessToken, refreshToken, user: JSON.parse(user)}));
        };
        const handleGetActiveNotisCount = async () => {
            const activeNotisCount = await getSecureValue('activeNotisCount');
            dispatch(setActiveNotisCount(Number(activeNotisCount)));
        };
        hanldeKeyChain();
        handleGetActiveNotisCount();
    }, []);

    useEffect(() => {
        if (!accessToken) navigation.navigate('SignIn');
        else navigation.navigate('Books', {screen: 'RegisteredBook'});
    }, [accessToken]);

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
                name="UserSetting"
                component={UpdateUserScreen}
                options={{
                    drawerLabel: 'User setting',
                    headerTitle: 'User setting',
                    drawerIcon: () => <FontAwesome size={20} name="user-circle-o" color="#1E90FF" />,
                }}
            />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    drawerLabel: 'Change Password',
                    headerTitle: 'Change Password',
                    drawerIcon: () => <Ionicons size={20} name="settings-sharp" color="#1E90FF" />,
                }}
            />
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{
                    drawerIcon: () => <AntDesign size={20} name="questioncircle" color="#1E90FF" />,
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
