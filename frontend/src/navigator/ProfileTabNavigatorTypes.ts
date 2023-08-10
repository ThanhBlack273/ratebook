import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from './StackNavigatorTypes';

export type ProfileTabParamList = {
    ReviewTab: {id: number};
    RegisterTab: {id: number};
    FavoriteTab: {id: number};
};

export type ReviewTabProps = CompositeScreenProps<
    MaterialTopTabScreenProps<ProfileTabParamList, 'ReviewTab'>,
    NativeStackScreenProps<StackParamList>
>;

export type RegisterTabProps = CompositeScreenProps<
    MaterialTopTabScreenProps<ProfileTabParamList, 'RegisterTab'>,
    NativeStackScreenProps<StackParamList>
>;

export type FavoriteTabProps = CompositeScreenProps<
    MaterialTopTabScreenProps<ProfileTabParamList, 'FavoriteTab'>,
    NativeStackScreenProps<StackParamList>
>;
