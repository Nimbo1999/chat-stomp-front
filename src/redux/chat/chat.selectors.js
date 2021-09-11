import { createSelector } from '@reduxjs/toolkit';

export const selectChat = state => state.chat;

export const selectChatClient = createSelector(
    [selectChat],
    chat => chat.client
);
