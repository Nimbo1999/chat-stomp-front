import { createAsyncThunk } from '@reduxjs/toolkit';

import {API_CONSTANTS} from '../../constants/api.constants';
import roomAdapter from '../../adapters/room.adapter';

import HttpService from '../../services/HttpService';
import {selectUser} from '../user/userSlice.reducer';
import {selectedRoomUser} from './channel.reducer';

const createRoom = createAsyncThunk('channel/createRoom', async (onSuccess, {getState, rejectWithValue}) => {
    const http = new HttpService();

    try {
        const currentUser = selectUser(getState());
        const targetUser = selectedRoomUser(getState());

        const roomToken = await http.post(
            roomAdapter.createRoom(currentUser, targetUser),
            `${API_CONSTANTS.ROOM.ROOMS}${API_CONSTANTS.ROOM.OPEN}`
        );

        if (onSuccess) onSuccess(roomToken);
        return roomToken;
    } catch(err) {
        return rejectWithValue(err.message);
    }
});

export function createRoomPending(state) {
    return {
        ...state,
        loading: true,
        error: null,
    }
}

export function createRoomFulfilled(state, action) {
    return {
        ...state,
        loading: false,
        availableRooms: [ ...state.availableRooms, action.payload ],
        isShowingNewRoomSection: false,
        selectedRoomUser: { token: '' },
        currentRoom: { token: action.payload }
    }
}

export function createRoomRejected(state, action) {
    return {
        ...state,
        loading: false,
        error: action.payload
    }
}

export default createRoom;
