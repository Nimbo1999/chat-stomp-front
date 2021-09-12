const roomAdapter = {
    createRoom: (currentUser, targetUser) => {
        return {
            sender: {
                token: currentUser.token,
                name: currentUser.name,
                color: currentUser.status,
            },
            recipient: {
                token: targetUser.token,
                name: targetUser.name,
                color: targetUser.status,
            },
        };
    },

    getRoom: ({ room, messages }) => ({
        token: room.token,
        startedOn: room.startedOn,
        closedOn: room.closedOn,
        messages,
        recipient: {
            token: room.recipient.token,
            name: room.recipient.name,
        },
        sender: {
            token: room.sender.token,
            name: room.sender.name,
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

}

export default roomAdapter;
