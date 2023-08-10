import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {IUSer} from '../auth';

interface IinitialState {
    currUser: IUSer | null;
}

const initialState: IinitialState = {
    currUser: null,
};

const frofileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setCurrUser: (state, action: PayloadAction<IUSer>) => {
            state.currUser = action.payload;
        },
    },
});

export const {setCurrUser} = frofileSlice.actions;

export default frofileSlice.reducer;
