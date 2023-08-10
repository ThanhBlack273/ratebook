import {
    AnyAction,
    Dispatch,
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from '@reduxjs/toolkit';

import {isPayloadError} from '../common/utils/heaper';
import Toast from 'react-native-toast-message';

export const catchErrorAPI: Middleware =
    (api: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
        if (isRejectedWithValue(action)) {
            if (isPayloadError(action.payload)) {
                Toast.show({
                    type: 'error',
                    text1: action.payload.data.error,
                });
            }
        }
        next(action);
    };
