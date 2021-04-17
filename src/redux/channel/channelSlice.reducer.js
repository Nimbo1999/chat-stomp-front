import { createSlice, createSelector } from '@reduxjs/toolkit';

import createRoom, { createRoomFulfilled, createRoomPending, createRoomRejected } from './createRoom.action';
import getRoom, { getRoomPending, getRoomFulfilled, getRoomRejected } from './getRoom.action';
import closeRoom, { closeRoomPending, closeRoomFulfilled, closeRoomRejected } from './closeRoom.action';
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

export const channelSlice = createSlice({
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
      .addCase(closeRoom.rejected, closeRoomRejected);
  }
});

export const {
  setContacts, setShowNewRoomSection, setSelectedRoomUser, closeError, setCurrentRoom,
  respondToCloseRoom
} = channelSlice.actions;

export const selectChannel = state => state.channel;

export const selectContacts = createSelector(
  [selectChannel],
  (channel) => channel.contacts
);

export const selectedRoomUser = createSelector(
  [selectChannel],
  (channel) => channel.selectedRoomUser
);

export const selectIsShowingNewRoomSection = createSelector(
  [selectChannel],
  (channel) => channel.isShowingNewRoomSection
);

export const selectAvailableRooms = createSelector(
  [selectChannel],
  (channel) => channel.availableRooms
);

export const selectCurrentRoom = createSelector(
  [selectChannel],
  (channel) => channel.currentRoom
);

export const isLoading = createSelector(
  [selectChannel],
  (channel) => channel.loading
);

export const selectError = createSelector(
  [selectChannel],
  (channel) => channel.error
);

export default channelSlice.reducer;
