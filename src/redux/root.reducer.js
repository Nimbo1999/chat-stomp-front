import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import channelReducer from './channel/channelSlice.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
});

export default rootReducer;
