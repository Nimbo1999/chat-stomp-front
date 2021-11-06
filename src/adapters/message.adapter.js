import { MESSAGE_STATUS } from '../constants/messageStatus';

const messageAdapter = {
    inputToMessages: ({ timestamp, messageId, content, messageOwnerToken }) => ({
        currentStatus: MESSAGE_STATUS.NOT_SENDED,
        date: new Date(timestamp).toISOString(),
        id: messageId,
        text: content,
        userToken: messageOwnerToken
    }),
    messageToStompRequest: (roomId, { id, date, text, userToken }) => ({
        messageId: id,
        roomId,
        content: text,
        timestamp: new Date(date).getTime(),
        messageOwnerToken: userToken
    })
};

export default messageAdapter;
