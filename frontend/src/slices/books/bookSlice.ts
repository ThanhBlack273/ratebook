import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IinitialState {
    modalType: {
        type:
            | 'NEW_COMMENT'
            | 'EDIT_COMMENT'
            | 'HIDE_COMMENT'
            | 'DELETE_COMMENT'
            | 'REQUEST_TO_REVIEW'
            | '';
        value?: any;
        title?: string;
    };
    currDetailBook: number;
}

const initialState: IinitialState = {
    modalType: {type: ''},
    currDetailBook: -1,
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        updateModalType: (state, action: PayloadAction<typeof initialState.modalType>) => {
            state.modalType = action.payload;
        },
        updateCurrDetailBook: (state, action: PayloadAction<number>) => {
            state.currDetailBook = action.payload;
        },
    },
});

export const {updateModalType, updateCurrDetailBook} = bookSlice.actions;

export default bookSlice.reducer;
