const roomAdapter = {
    createRoom: (currentUser, targetUser) => ({
        sender: {
            token: currentUser.token,
            name: currentUser.name
        },
        recipient: {
            token: targetUser.token,
            name: targetUser.name
        }
    }),

    getRoom: ({ room, quantityOfMessages }) => ({
        id: room.id,
        startedOn: room.startedOn,
        closedOn: room.closedOn,
        messages: [],
        quantityOfMessages,
        messagesCount: 0,
        recipient: {
            token: room.recipient.token,
            name: room.recipient.name
        },
        sender: {
            token: room.sender.token,
            name: room.sender.name
        },
        cursorMark: ''
    }),

    getMoreMessages: ({ messages, count, cursorMark }) => {
        const roomMessages =
            messages && messages.length
                ? messages.map(message => ({
                      id: message.id,
                      userToken: message.userToken,
                      currentStatus: message.currentStatus,
                      text: message.content,
                      date: message.timestamp
                  }))
                : [];

        return {
            count,
            cursorMark,
            messages: roomMessages
        };
    },

    getUserAvailablesRooms: rooms =>
        rooms.map(({ id, recipient, sender }) => ({
            id,
            recipient,
            sender,
            badge: 0
        }))
};

export default roomAdapter;
