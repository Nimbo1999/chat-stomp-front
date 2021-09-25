import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';
import { selectCurrentRoom } from './channel.selector';

import HttpService from '../../services/HttpService';

const closeRoom = createAsyncThunk(
    'channel/closeRoom',
    async (onSuccess, { getState, rejectWithValue }) => {
        const http = new HttpService();

        const { token } = selectCurrentRoom(getState());

        try {
            const url =
                API_CONSTANTS.ROOM.ROOMS +
                API_CONSTANTS.URL_PARAM(token) +
                API_CONSTANTS.ROOM.CLOSE;

            await http.post({}, url);

            if (onSuccess) onSuccess(token);

            return token;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const closeRoomPending = state => ({
    ...state,
    loading: true,
    error: null
});

export const closeRoomFulfilled = (state, action) => {
    const newAvailableRooms = state.availableRooms.filter(({ token }) => token !== action.payload);

    return {
        ...state,
        loading: false,
        currentRoom: null,
        availableRooms: newAvailableRooms
    };
};

export const closeRoomRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
});

export default closeRoom;
