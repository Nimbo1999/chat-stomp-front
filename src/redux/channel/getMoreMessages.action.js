import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import { selectCurrentRoomId } from './channel.selector';

import HttpService from '../../services/HttpService';

const getMoreMessages = createAsyncThunk(
    'channel/getMoreMessages',
    async ({ page, size, onSuccess }, { rejectWithValue, getState }) => {
        const http = new HttpService();
        const roomId = selectCurrentRoomId(getState());

        try {
            const url =
                API_CONSTANTS.ROOM.ROOMS +
                API_CONSTANTS.URL_PARAM(roomId) +
                API_CONSTANTS.ROOM.MESSEGES +
                API_CONSTANTS.URL_QUERY_STRING({ page, size });

            const messages = await http.get(url);

            const payload = roomAdapter.getMoreMessages(messages);

            if (onSuccess && typeof onSuccess === 'function') onSuccess(payload.reverse());

            return payload;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const getMoreMessagesPending = state => ({
    ...state,
    loading: true,
    error: null
});

export const getMoreMessagesFulfilled = (state, action) => {
    const messages = [...action.payload];
    if (state.currentRoom && state.currentRoom.messages)
        messages.push(...state.currentRoom.messages);

    return {
        ...state,
        loading: false,
        currentRoom: {
            ...state.currentRoom,
            messages
        }
    };
};

export const getMoreMessagesRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
});

export default getMoreMessages;
