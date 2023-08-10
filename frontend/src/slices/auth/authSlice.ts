import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUSer} from './authType';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IinitialState {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    user: IUSer | undefined;
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
            state.user = action.payload.user;
        },
        userLoggedOut: state => {
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.user = undefined;
            AsyncStorage.removeItem('accessToken');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('user');
        },
    },
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;

export default authSlice.reducer;
