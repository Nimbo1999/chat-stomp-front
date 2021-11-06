import { combineReducers } from '@reduxjs/toolkit';

import channelReducer from './channel/channel.reducer';
import userReducer from './user/userSlice.reducer';
import unsentMessagesReducer from './unsentMessages/unsentMessages.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    unsentMessages: unsentMessagesReducer
});

export default rootReducer;
