import { createSelector } from '@reduxjs/toolkit';

export const selectChannel = state => state.channel;

export const selectContacts = createSelector([selectChannel], channel => channel.contacts);

export const selectedRoomUser = createSelector(
    [selectChannel],
    channel => channel.selectedRoomUser
);

export const selectIsShowingNewRoomSection = createSelector(
    [selectChannel],
    channel => channel.isShowingNewRoomSection
);

export const selectAvailableRooms = createSelector(
    [selectChannel],
    channel => channel.availableRooms
);

export const selectCurrentRoom = createSelector([selectChannel], channel => channel.currentRoom);

export const selectCurrentRoomToken = createSelector([selectCurrentRoom], currentRoom =>
    currentRoom ? currentRoom.token : null
);

export const selectCurrentRoomMessages = createSelector([selectCurrentRoom], currentRoom =>
    currentRoom ? currentRoom.messages : null
);

export const selectCurrentRoomRecipient = createSelector([selectCurrentRoom], currentRoom =>
    currentRoom ? currentRoom.recipient : null
);

export const selectCurrentRoomRecipientToken = createSelector(
    [selectCurrentRoomRecipient],
    recipient => (recipient ? recipient.token : null)
);

export const isLoading = createSelector([selectChannel], channel => channel.loading);

export const selectError = createSelector([selectChannel], channel => channel.error);
