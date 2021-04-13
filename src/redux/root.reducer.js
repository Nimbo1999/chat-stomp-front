import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import contactsReducer from './contacts/contactsSlice';

const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactsReducer
});

export default rootReducer;
