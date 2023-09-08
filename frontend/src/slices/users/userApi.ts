import {setSecureValue} from '../../common/utils/keyChain';
import {updateUser, userLoggedIn} from '../auth';
import {rateBookApiSlice} from '../rateBookApiSlice';
import {IUpdateUserInput, IUpdateUserOutput, User} from './userType';

const userApi = rateBookApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<User[], string>({
            query: text => ({
                url: `/action/notification/listUser?search=${text}`,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation<IUpdateUserOutput, IUpdateUserInput>({
            query: data => ({
                url: '/auth/change_info_user',
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

export const {useGetUsersQuery, useUpdateUserMutation} = userApi;

export default userApi;
