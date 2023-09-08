export {default as authApi} from './authApi';
export {
    useSignInMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetUserInfoQuery,
    useChangePasswordMutation,
} from './authApi';

export {default as authSlice} from './authSlice';
export {userLoggedIn, userLoggedOut, updateUser} from './authSlice';

export type {
    ISignInInput,
    ISignInOutput,
    IUSer,
    ISignUpInput,
    IForgotPasswordInput,
    IForgotPasswordOutput,
    IResetPasswordInput,
    IChangePasswordInput,
    IChangePasswordOutput,
} from './authType';
