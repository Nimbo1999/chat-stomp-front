import { createSlice, createSelector } from '@reduxjs/toolkit';
import contacts from '../../mock/contacts.mock';

const initialState = {
  contacts,
  availableRooms: [],
  isShowingNewRoomSection: false,
  selectedRoomUser: {
    token: ''
  },
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
  },
});

export const { setContacts, setShowNewRoomSection, setSelectedRoomUser } = channelSlice.actions;

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

export default channelSlice.reducer;
