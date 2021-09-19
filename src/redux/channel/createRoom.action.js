import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_CONSTANTS } from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import HttpService from '../../services/HttpService';
import { selectUser } from '../user/userSlice.reducer';
import { selectedRoomUser } from './channel.selector';

const createRoom = createAsyncThunk('channel/createRoom', async (onSuccess, {getState, rejectWithValue}) => {
    const http = new HttpService();

    try {
        const currentUser = selectUser(getState());
        const targetUser = selectedRoomUser(getState());

        const bodyPayload = roomAdapter.createRoom(currentUser, targetUser);

        const roomToken = await http.post(
            bodyPayload,
            `${API_CONSTANTS.ROOM.ROOMS}${API_CONSTANTS.ROOM.OPEN}`
        );

        const responsePayload = { ...bodyPayload, token: roomToken, badge: 0 }

        if (onSuccess) onSuccess(responsePayload);

        return responsePayload;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export const createRoomPending = state => ({
    ...state,
    loading: true,
    error: null,
});

export const createRoomFulfilled = (state, action) => ({
    ...state,
    loading: false,
    availableRooms: [ ...state.availableRooms, action.payload ],
    isShowingNewRoomSection: false,
    selectedRoomUser: { token: '' },
    currentRoom: { token: action.payload }
});

export const createRoomRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
});

export default createRoom;
