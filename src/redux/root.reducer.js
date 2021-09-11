import { combineReducers } from '@reduxjs/toolkit';

import channelReducer from './channel/channel.reducer';
import userReducer from './user/userSlice.reducer';
import chatReducer from './chat/chatSlice.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    chat: chatReducer
});

export default rootReducer;
