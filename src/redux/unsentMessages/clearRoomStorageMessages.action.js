import IllegalArgumentsError from '../../exceptions/IllegalArgumentsError';

const clearRoomStorageMessages = (state, action) => {
    const { payload } = action;
    if (!payload || !payload.roomId) {
        throw new IllegalArgumentsError(
            'Parameter roomId of payload it is required in order to call this action'
        );
    }
    const currentRoomKeys = Object.keys(state).filter(key => key !== payload.roomId);
    const newState = {};
    for (const key of currentRoomKeys) {
        newState[key] = state[key];
    }
    return newState;
};

export default clearRoomStorageMessages;
