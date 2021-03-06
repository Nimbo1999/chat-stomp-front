import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import registerMessageAction from './registerMessage.action';
import clearRoomStorageMessagesAction from './clearRoomStorageMessages.action';
import removeMessageAction from './removeMessage.action';

const initialState = {};

const unsentMessages = createSlice({
    name: 'unsentMessages',
    initialState,
    reducers: {
        registerMessage: registerMessageAction,
        clearRoomStorageMessages: clearRoomStorageMessagesAction,
        removeMessage: removeMessageAction
    }
});

export const { registerMessage, clearRoomStorageMessages, removeMessage } = unsentMessages.actions;

export default persistReducer(
    {
        key: 'unsentMessages',
        storage,
        stateReconciler: autoMergeLevel2
    },
    unsentMessages.reducer
);
