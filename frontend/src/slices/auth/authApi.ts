import {rateBookApiSlice} from '../rateBookApiSlice';
import {
    IChangePasswordInput,
    IChangePasswordOutput,
    IForgotPasswordInput,
    IForgotPasswordOutput,
    IResetPasswordInput,
    ISignInInput,
    ISignInOutput,
    ISignUpInput,
    IUSer,
} from './authType';
import {updateUser, userLoggedIn} from './authSlice';
import {setSecureValue} from '../../common/utils/keyChain';

const authApi = rateBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation<ISignInOutput, ISignInInput>({
            query: data => ({
                url: '/auth/signin',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;

                    await setSecureValue('accessToken', result.data.accessToken);
                    await setSecureValue('refreshToken', result.data.refreshToken);
                    await setSecureValue('user', JSON.stringify(result.data.user));

                    dispatch(userLoggedIn(result.data));
                } catch (error) {
                    // do something
                }
            },
        }),
        SignUp: builder.mutation<IUSer, ISignUpInput>({
            query: data => ({
                url: '/auth/signup',
                method: 'POST',
                body: data,
            }),
        }),
        forgotPassword: builder.mutation<IForgotPasswordOutput, IForgotPasswordInput>({
            query: data => ({
                url: '/auth/forgot_password',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<void, IResetPasswordInput>({
            query: data => ({
                headers: {Authorization: 'Bearer ' + data.token},
                url: '/auth/reset_password',
                method: 'POST',
                body: data,
            }),
        }),
        getUserInfo: builder.query<IUSer, number>({
            query: userId => ({
                url: `/user//get_user_info?id=${userId}`,
                method: 'GET',
            }),
        }),
        changePassword: builder.mutation<IChangePasswordOutput, IChangePasswordInput>({
            query: data => ({
                url: '/auth/change_password',
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;

                    await setSecureValue('accessToken', result.data.accessToken);
                    await setSecureValue('user', JSON.stringify(result.data.user));
                    dispatch(updateUser(result.data));
                } catch (error) {
                    // do something
                }
            },
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetUserInfoQuery,
    useChangePasswordMutation,
} = authApi;

export default authApi;
