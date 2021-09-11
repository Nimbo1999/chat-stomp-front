import { createSlice } from '@reduxjs/toolkit';

import createRoom, { createRoomFulfilled, createRoomPending, createRoomRejected } from './createRoom.action';
import getRoom, { getRoomPending, getRoomFulfilled, getRoomRejected } from './getRoom.action';
import closeRoom, { closeRoomPending, closeRoomFulfilled, closeRoomRejected } from './closeRoom.action';
import getUserAvailablesRooms, { getUserAvailablesRoomsPending, getUserAvailablesRoomsFulfilled, getUserAvailablesRoomsRejected } from './getUserAvailablesRooms.action';
import contacts from '../../mock/contacts.mock';

const initialState = {
    contacts,
    availableRooms: [],
    currentRoom: null,
    isShowingNewRoomSection: false,
    selectedRoomUser: {
        token: ''
    },
    loading: false,
    error: null
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setContacts: (state, action) => ({
      ...state,
      contacts: action.payload
    }),
    setShowNewRoomSection: (state, action) => ({
      ...state,
      isShowingNewRoomSection: action.payload,
    }),
    setSelectedRoomUser: (state, action) => ({
      ...state,
      selectedRoomUser: action.payload,
    }),
    closeError: (state) => ({
      ...state,
      error: null
    }),
    setCurrentRoom: (state, action) => ({
      ...state,
      currentRoom: action.payload,
    }),
    respondToCloseRoom: (state) => {
      const newAvailableRooms = [
        ...state.availableRooms.filter(room => room !== state.currentRoom.token)
      ];

      return {
        ...state,
        availableRooms: newAvailableRooms,
      }
    },
    insertIncomingMessage: (state, action) => ({
        ...state,
        currentRoom: {
            ...state.currentRoom,
            messages: action.payload
        }
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, createRoomPending)
      .addCase(createRoom.fulfilled, createRoomFulfilled)
      .addCase(createRoom.rejected, createRoomRejected)
      .addCase(getRoom.pending, getRoomPending)
      .addCase(getRoom.fulfilled, getRoomFulfilled)
      .addCase(getRoom.rejected, getRoomRejected)
      .addCase(closeRoom.pending, closeRoomPending)
      .addCase(closeRoom.fulfilled, closeRoomFulfilled)
      .addCase(closeRoom.rejected, closeRoomRejected)
      .addCase(getUserAvailablesRooms.pending, getUserAvailablesRoomsPending)
      .addCase(getUserAvailablesRooms.fulfilled, getUserAvailablesRoomsFulfilled)
      .addCase(getUserAvailablesRooms.rejected, getUserAvailablesRoomsRejected);
  }
});

export const {
  setContacts, setShowNewRoomSection, setSelectedRoomUser, closeError, setCurrentRoom,
  respondToCloseRoom, insertIncomingMessage
} = channelSlice.actions;

export default channelSlice.reducer;
