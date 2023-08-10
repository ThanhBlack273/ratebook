import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUSer} from './authType';
import {removeSecureValue} from '../../common/utils/keyChain';

interface IinitialState {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    user?: IUSer;
}

const initialState: IinitialState = {
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<IinitialState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            if (action.payload.user) state.user = action.payload.user;
        },
        userLoggedOut: state => {
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.user = undefined;
            removeSecureValue('accessToken');
            removeSecureValue('refreshToken');
            removeSecureValue('user');
        },
    },
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;

export default authSlice.reducer;
