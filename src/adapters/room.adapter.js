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

    getRoom: ({ room, messages }) => ({
        token: room.token,
        startedOn: room.startedOn,
        closedOn: room.closedOn,
        messages:
            messages && messages.length
                ? messages.map(message => ({
                      token: message.token,
                      userToken: message.userToken,
                      text: message.content,
                      date: message.timestamp
                  }))
                : [],
        recipient: {
            token: room.recipient.token,
            name: room.recipient.name
        },
        sender: {
            token: room.sender.token,
            name: room.sender.name
        }
    }),

    getUserAvailablesRooms: rooms => {
        return rooms.map(({ token, recipient, sender }) => ({
            token,
            recipient,
            sender,
            badge: 0
        }));
    }
};

export default roomAdapter;
