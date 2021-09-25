import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';

import { selectUserToken } from '../user/userSlice.reducer';

import HttpService from '../../services/HttpService';

import roomAdapter from '../../adapters/room.adapter';

const getUserAvailablesRooms = createAsyncThunk(
    'channel/getUserAvailablesRooms',
    async (onSuccess, { getState, rejectWithValue }) => {
        const http = new HttpService();

        const userToken = selectUserToken(getState());

        try {
            const url =
                API_CONSTANTS.ROOM.ROOMS +
                API_CONSTANTS.ROOM.USERS +
                API_CONSTANTS.URL_PARAM(userToken);

            const data = await http.get(url);

            const payload = roomAdapter.getUserAvailablesRooms(data);

            if (onSuccess) onSuccess(payload);

            return payload;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export function getUserAvailablesRoomsPending(state) {
    return {
        ...state,
        loading: true,
        error: null
    };
}

export function getUserAvailablesRoomsFulfilled(state, action) {
    return {
        ...state,
        loading: false,
        availableRooms: action.payload
    };
}

export function getUserAvailablesRoomsRejected(state, action) {
    return {
        ...state,
        loading: false,
        error: action.payload
    };
}

export default getUserAvailablesRooms;
