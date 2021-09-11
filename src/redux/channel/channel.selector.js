import { createSelector } from '@reduxjs/toolkit';

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