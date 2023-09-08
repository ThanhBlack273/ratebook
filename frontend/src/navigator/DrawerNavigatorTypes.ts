import {DrawerNavigationProp, DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeNavigationProp, NavigatorScreenParams} from '@react-navigation/native';

import {HomeNavigationProp, StackParamList} from './StackNavigatorTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type DrawerParamList = {
    Home: NavigatorScreenParams<StackParamList>;
    UserSetting: undefined;
    ChangePassword: undefined;
    About: undefined;
};

export type HomeProps = DrawerScreenProps<DrawerParamList, 'Home'>;
export type HomeNavigatorProps = DrawerNavigationProp<DrawerParamList, 'Home'>;
