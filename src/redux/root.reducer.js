import { combineReducers } from '@reduxjs/toolkit';

import channelReducer from './channel/channel.reducer';
import userReducer from './user/userSlice.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer
});

export default rootReducer;
