import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import contactsReducer from './contacts/contactsSlice';
import roomReducer from './room/roomSlice.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactsReducer,
    room: roomReducer
});

export default rootReducer;
