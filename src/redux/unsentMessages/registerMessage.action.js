import IllegalArgumentsError from '../../exceptions/IllegalArgumentsError';

const registerMessage = (state, action) => {
    const { payload } = action;

    if (!payload || !payload.roomId) {
        throw new IllegalArgumentsError(
            'Parameter roomId of payload it is required in order to call this action'
        );
    }

    const currentRoomMessagesByRoomId = state[payload.roomId];

    return currentRoomMessagesByRoomId
        ? {
              ...state,
              [payload.roomId]: [
                  ...currentRoomMessagesByRoomId,
                  {
                      ...payload.message
                  }
              ]
          }
        : {
              ...state,
              [payload.roomId]: [
                  {
                      ...payload.message
                  }
              ]
          };
};

export default registerMessage;
