import {DrawerNavigationProp, DrawerScreenProps} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';

import {StackParamList} from './StackNavigatorTypes';

export type DrawerParamList = {
    Home: NavigatorScreenParams<StackParamList>;
    About: undefined;
};

export type HomeProps = DrawerScreenProps<DrawerParamList, 'Home'>;

export type HomeNavigatorProps = DrawerNavigationProp<DrawerParamList, 'Home'>;
