import {rateBookApiSlice} from '../rateBookApiSlice';
import {
    IForgotPasswordInput,
    IForgotPasswordOutput,
    IResetPasswordInput,
    ISignInInput,
    ISignInOutput,
    IUSer,
} from './authType';
import {userLoggedIn} from './authSlice';
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
        SignUp: builder.mutation<IUSer, FormData>({
            query: data => ({
                url: '/auth/signup',
                method: 'POST',
                body: data,
                formData: true,
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
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetUserInfoQuery,
} = authApi;

export default authApi;
