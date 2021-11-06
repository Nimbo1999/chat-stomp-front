import { MESSAGE_STATUS } from '../constants/messageStatus';

const messageAdapter = {
    inputToMessages: ({ timestamp, messageId, content, messageOwnerToken }) => ({
        currentStatus: MESSAGE_STATUS.NOT_SENDED,
        date: new Date(timestamp).toISOString(),
        id: messageId,
        text: content,
        userToken: messageOwnerToken
    })
};

export default messageAdapter;
