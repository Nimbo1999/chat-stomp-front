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
            status: room.recipient.color,
        },
    }),

    getUserAvailablesRooms: rooms => {
        return rooms.map(({ token, recipient }) => ({ token, name: recipient.name }));
    }

}

export default roomAdapter;
