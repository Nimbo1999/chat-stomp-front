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

export const selectAvailableRoomsLength = createSelector(
    [selectAvailableRooms],
    availableRooms => availableRooms.length
);

export const selectCurrentRoom = createSelector([selectChannel], channel => channel.currentRoom);

export const selectCurrentRoomId = createSelector([selectCurrentRoom], currentRoom =>
    currentRoom ? currentRoom.id : null
);

export const selectCursorMark = createSelector([selectCurrentRoom], currentRoom =>
    currentRoom ? currentRoom.cursorMark : null
);

export const selectCurrentRoomMessages = createSelector([selectCurrentRoom], currentRoom =>
    currentRoom && currentRoom.messages ? currentRoom.messages : []
);

export const selectMessagesCont = createSelector(
    [selectCurrentRoom],
    currentRoom => currentRoom.messagesCount
);

export const selectCurrentRoomQuantityOfMessages = createSelector(
    [selectCurrentRoom],
    currentRoom => (currentRoom ? currentRoom.quantityOfMessages : null)
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
