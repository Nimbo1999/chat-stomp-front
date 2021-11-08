import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import { selectCurrentRoomId, selectCursorMark } from './channel.selector';

import HttpService from '../../services/HttpService';

const getMoreMessages = createAsyncThunk(
    'channel/getMoreMessages',
    async (onSuccess, { rejectWithValue, getState }) => {
        const http = new HttpService();
        const roomId = selectCurrentRoomId(getState());
        const cursorMark = selectCursorMark(getState());

        try {
            const url =
                API_CONSTANTS.ROOM.ROOMS +
                API_CONSTANTS.URL_PARAM(roomId) +
                API_CONSTANTS.ROOM.MESSEGES +
                API_CONSTANTS.URL_QUERY_STRING({ cursorMark });

            const response = await http.get(url);

            const payload = roomAdapter.getMoreMessages(response);

            if (onSuccess && typeof onSuccess === 'function') onSuccess(payload);

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
    const { messages, count, cursorMark } = action.payload;

    const roomMessages = [...state.currentRoom.messages];

    if (state.currentRoom && state.currentRoom.messages) {
        roomMessages.push(...messages);
    }

    return {
        ...state,
        loading: false,
        currentRoom: {
            ...state.currentRoom,
            messages: roomMessages,
            cursorMark,
            messagesCount: count
        }
    };
};

export const getMoreMessagesRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
});

export default getMoreMessages;
