import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import channelReducer from './channel/channelSlice.reducer';
import roomReducer from './room/roomSlice.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    room: roomReducer
});

export default rootReducer;
