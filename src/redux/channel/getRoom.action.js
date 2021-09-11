import { createAsyncThunk } from '@reduxjs/toolkit';

import {API_CONSTANTS} from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import HttpService from '../../services/HttpService';

const getRoom = createAsyncThunk('channel/getRoom', async ({ roomToken, onSuccess }, {rejectWithValue}) => {
    const http = new HttpService();

    try {
        const url =
            API_CONSTANTS.ROOM.ROOMS +
            API_CONSTANTS.URL_PARAM(roomToken) +
            API_CONSTANTS.ROOM.CONTENT;

        const room = await http.get(url);

        if (onSuccess && typeof onSuccess === 'function') onSuccess(room);

        return roomAdapter.getRoom(room);
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export function getRoomPending(state) {
    return {
        ...state,
        loading: true,
        error: null,
        currentRoom: null
    }
}

export function getRoomFulfilled(state, action) {
    return {
        ...state,
        loading: false,
        currentRoom: {
            ...state.currentRoom,
            ...action.payload,
        },
    }
}

export function getRoomRejected(state, action) {
    return {
        ...state,
        loading: false,
        error: action.payload
    }
}

export default getRoom;
