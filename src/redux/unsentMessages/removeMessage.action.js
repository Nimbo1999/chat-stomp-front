import IllegalArgumentsError from '../../exceptions/IllegalArgumentsError';

const hasInvalidPayload = payload => !payload || !payload.roomId || !payload.messageId;

const removeMessage = (state, action) => {
    const { payload } = action;
    if (hasInvalidPayload(payload)) {
        throw new IllegalArgumentsError(
            'Parameters roomId and messageId of payload it is required in order to call this action'
        );
    }
    const currentRoomMessagesByRoomId = state[payload.roomId];
    if (!currentRoomMessagesByRoomId) return state;

    const newRoomIdContent = currentRoomMessagesByRoomId.filter(
        content => content.id !== payload.messageId
    );

    if (newRoomIdContent.length) {
        return {
            ...state,
            [payload.roomId]: newRoomIdContent
        };
    }

    const stateKeys = Object.keys(state);
    const newState = stateKeys
        .filter(key => key !== payload.roomId)
        .map(key => ({ [key]: state[key] }));

    return newState;
};

export default removeMessage;
