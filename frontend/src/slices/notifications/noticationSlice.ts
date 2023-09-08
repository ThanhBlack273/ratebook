import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {setSecureValue} from '../../common/utils/keyChain';

interface IinitialState {
    activeNotisCount: number;
}

const initialState: IinitialState = {
    activeNotisCount: 0,
};

const notificationSlice = createSlice({
    name: 'activeNotisCount',
    initialState,
    reducers: {
        inceateActiveNotisCount: state => {
            state.activeNotisCount += 1;
            setSecureValue('activeNotisCount', String(state.activeNotisCount));
        },
        setActiveNotisCount: (state, action: PayloadAction<number>) => {
            state.activeNotisCount = action.payload;
            setSecureValue('activeNotisCount', String(state.activeNotisCount));
        },
        resetActiveNotisCount: state => {
            state.activeNotisCount = 0;
            setSecureValue('activeNotisCount', String(state.activeNotisCount));
        },
    },
});

export const {inceateActiveNotisCount, setActiveNotisCount, resetActiveNotisCount} = notificationSlice.actions;

export default notificationSlice.reducer;
