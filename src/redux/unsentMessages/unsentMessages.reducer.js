import { createSlice } from '@reduxjs/toolkit';

import registerMessageAction from './registerMessage.action';

const initialState = {};

const unsentMessages = createSlice({
    name: 'unsentMessages',
    initialState,
    reducers: {
        registerMessage: registerMessageAction
    }
});

export const { registerMessage } = unsentMessages.actions;

export default unsentMessages.reducer;
