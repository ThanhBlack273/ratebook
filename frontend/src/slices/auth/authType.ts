import {Asset} from 'react-native-image-picker';

export interface IUSer {
    id: string;
    email: string;
    userName: string;
    dateOfBirth: string;
    phoneNumber: string;
    avatar: string;
}
export interface ISignInInput {
    email: string;
    password: string;
}

export interface ISignInOutput {
    accessToken: string;
    refreshToken: string;
    user: IUSer;
}

export interface ISignUpInput {
    email: string;
    password: string;
    passwordConfirm: string;
    userName: string;
    phoneNumber: string;
    secretAsk: string;
    secretAns: string;
    avatar: undefined | Asset;
    dateOfBirth: Date;
}

export interface IForgotPasswordInput {
    email: string;
    secretAsk: string;
    secretAns: string;
}

export interface IForgotPasswordOutput {
    token: string;
}

export interface IResetPasswordInput {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}
