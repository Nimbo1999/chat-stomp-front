import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import { getMoreMessages } from './channel.reducer';
import { selectCurrentRoomId } from './channel.selector';

import HttpService from '../../services/HttpService';

const getMessages = createAsyncThunk(
    'channel/getMessages',
    async ({ page, size }, { rejectWithValue, dispatch, getState }) => {
        const http = new HttpService();
        const roomId = selectCurrentRoomId(getState());

        try {
            const url =
                API_CONSTANTS.ROOM.ROOMS +
                API_CONSTANTS.URL_PARAM(roomId) +
                API_CONSTANTS.ROOM.CONTENT +
                API_CONSTANTS.URL_QUERY_STRING({ page, size });

            const messages = await http.get(url);

            const payload = roomAdapter.getMessages(messages);

            dispatch(getMoreMessages(payload));

            return payload;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const getMessagesPending = state => ({
    ...state,
    loading: true,
    error: null,
    currentRoom: null
});

export const getMessagesFulfilled = state => ({
    ...state,
    loading: false
});

export const getMessagesRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
});

export default getMessages;
