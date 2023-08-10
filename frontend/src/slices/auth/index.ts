export {default as authApi} from './authApi';
export {
    useSignInMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetUserInfoQuery,
} from './authApi';

export {default as authSlice} from './authSlice';
export {userLoggedIn, userLoggedOut} from './authSlice';

export type {
    ISignInInput,
    ISignInOutput,
    IUSer,
    ISignUpInput,
    IForgotPasswordInput,
    IForgotPasswordOutput,
    IResetPasswordInput,
} from './authType';
