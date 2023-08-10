import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from './StackNavigatorTypes';

export type HomeTabParamList = {
    RegisteredBook: undefined;
    ReviewBook: undefined;
};

export type RegisteredBookTabProps = CompositeScreenProps<
    MaterialTopTabScreenProps<HomeTabParamList, 'RegisteredBook'>,
    NativeStackScreenProps<StackParamList>
>;
export type ReviewBookTabProps = CompositeScreenProps<
    MaterialTopTabScreenProps<HomeTabParamList, 'ReviewBook'>,
    NativeStackScreenProps<StackParamList>
>;
