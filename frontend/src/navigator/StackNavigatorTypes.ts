import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps, NativeStackNavigationProp} from '@react-navigation/native-stack';

import {HomeTabParamList} from './TabNavigatorTypes';
import {ProfileTabParamList} from './ProfileTabNavigatorTypes';

export type StackParamList = {
    Books: NavigatorScreenParams<HomeTabParamList>;
    SignIn: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    ResetPassword: {token: string};
    Search: undefined;
    RegisterBook: {id?: string};
    Detail: {id: string};
    ImageCarousel: {images?: string[]};
    Profile: NavigatorScreenParams<ProfileTabParamList>;
    Notification: undefined;
};

export type SignInProps = NativeStackScreenProps<StackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<StackParamList, 'SignUp'>;
export type BooksScreenProps = NativeStackScreenProps<StackParamList, 'Books'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<StackParamList, 'ForgotPassword'>;
export type ResetPasswordScreenProps = NativeStackScreenProps<StackParamList, 'ResetPassword'>;
export type SearchScreenProps = NativeStackScreenProps<StackParamList, 'Search'>;
export type RegisterBookScreenProps = NativeStackScreenProps<StackParamList, 'RegisterBook'>;
export type DetailBookScreenProps = NativeStackScreenProps<StackParamList, 'Detail'>;
export type ImageCarouselScreenProps = NativeStackScreenProps<StackParamList, 'ImageCarousel'>;
export type ProfileScreenProps = NativeStackScreenProps<StackParamList, 'Profile'>;

// export type BooksNavigationProp = NativeStackNavigationProp<StackParamList, 'Books'>;
export type HomeNavigationProp = NativeStackNavigationProp<StackParamList>;
