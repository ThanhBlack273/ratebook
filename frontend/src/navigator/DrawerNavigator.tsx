import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';

import {DrawerParamList} from './DrawerNavigatorTypes';
import StackNavigator from './StackNavigator';
import {CustomDrawerContent} from '../common/components';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
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
