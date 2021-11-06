import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentRoomId } from '../channel/channel.selector';

const selectUnsentMessages = state => state.unsentMessages;

export const selectRoomIdMessages = createSelector(
    [selectUnsentMessages, selectCurrentRoomId],
    (unsentMessages, roomId) => unsentMessages[roomId]
);
