import { createAsyncThunk } from '@reduxjs/toolkit';

import {API_CONSTANTS} from '../../constants/api.constants';
import { selectCurrentRoom } from './channel.selector';

import HttpService from '../../services/HttpService';

const closeRoom = createAsyncThunk('channel/closeRoom', async (onSuccess, {getState, rejectWithValue}) => {
    const http = new HttpService();

    const { token } = selectCurrentRoom(getState());

    try {
        const url =
            API_CONSTANTS.ROOM.ROOMS +
            API_CONSTANTS.URL_PARAM(token) +
            API_CONSTANTS.ROOM.CLOSE;

        await http.post({}, url);

        if (onSuccess) onSuccess();
        return;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export function closeRoomPending(state) {
    return {
        ...state,
        loading: true,
        error: null,
    }
}

export function closeRoomFulfilled(state, action) {
    return {
        ...state,
        loading: false,
        currentRoom: null,
    }
}

export function closeRoomRejected(state, action) {
    return {
        ...state,
        loading: false,
        error: action.payload
    }
}

export default closeRoom;
