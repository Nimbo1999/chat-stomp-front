import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import channelReducer from './channel/channel.reducer';
import userReducer from './user/userSlice.reducer';
import unsentMessagesReducer from './unsentMessages/unsentMessages.reducer';

const rootReducer = persistCombineReducers(
    {
        key: 'rootReducer',
        storage,
        whitelist: ['user'],
        stateReconciler: autoMergeLevel2
    },
    {
        user: userReducer,
        channel: channelReducer,
        unsentMessages: unsentMessagesReducer
    }
);

export default rootReducer;
