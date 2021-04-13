import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './user/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
