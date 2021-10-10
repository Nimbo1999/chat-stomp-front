import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import HttpService from '../../services/HttpService';

const getRoom = createAsyncThunk(
    'channel/getRoom',
    async ({ roomId, onSuccess }, { rejectWithValue }) => {
        const http = new HttpService();

        try {
            const url =
                API_CONSTANTS.ROOM.ROOMS +
                API_CONSTANTS.URL_PARAM(roomId) +
                API_CONSTANTS.ROOM.CONTENT;

            const room = await http.get(url);

            const payload = roomAdapter.getRoom(room);

            if (onSuccess && typeof onSuccess === 'function') onSuccess(payload);

            return payload;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const getRoomPending = state => ({
    ...state,
    loading: true,
    error: null,
    currentRoom: null
});

export const getRoomFulfilled = state => ({
    ...state,
    loading: false
});

export const getRoomRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
});

export default getRoom;
