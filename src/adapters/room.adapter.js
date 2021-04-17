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

    getRoom: ({ room }) => ({
        recipient: {
            token: room.recipient.token,
            name: room.recipient.name,
            status: room.recipient.color,
        },
        startedOn: room.startedOn,
        closedOn: room.closedOn,
    }),

}

export default roomAdapter;
