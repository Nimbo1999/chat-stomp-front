import { createSlice } from '@reduxjs/toolkit';

import createRoom, {
    createRoomFulfilled,
    createRoomPending,
    createRoomRejected
} from './createRoom.action';
import getRoom, { getRoomPending, getRoomFulfilled, getRoomRejected } from './getRoom.action';
import closeRoom, {
    closeRoomPending,
    closeRoomFulfilled,
    closeRoomRejected
} from './closeRoom.action';
import getUserAvailablesRooms, {
    getUserAvailablesRoomsPending,
    getUserAvailablesRoomsFulfilled,
    getUserAvailablesRoomsRejected
} from './getUserAvailablesRooms.action';
import getMoreMessages, {
    getMoreMessagesPending,
    getMoreMessagesFulfilled,
    getMoreMessagesRejected
} from './getMoreMessages.action';

import contacts from '../../mock/contacts.mock';
import messageAdapter from '../../adapters/message.adapter';
import { MESSAGE_STATUS } from '../../constants/messageStatus';

const initialState = {
    contacts,
    availableRooms: [],
    currentRoom: null,
    isShowingNewRoomSection: false,
    selectedRoomUser: {
        id: ''
    },
    loading: false,
    error: null
};

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setContacts: (state, action) => ({
            ...state,
            contacts: action.payload
        }),
        setShowNewRoomSection: (state, action) => ({
            ...state,
            isShowingNewRoomSection: action.payload
        }),
        setSelectedRoomUser: (state, action) => ({
            ...state,
            selectedRoomUser: action.payload
        }),
        closeError: state => ({
            ...state,
            error: null
        }),
        setCurrentRoom: (state, action) => ({
            ...state,
            currentRoom: action.payload
        }),
        pushToAvailableRooms: (state, action) => ({
            ...state,
            availableRooms: [...state.availableRooms, action.payload]
        }),
        respondToCloseRoom: state => {
            const newAvailableRooms = [
                ...state.availableRooms.filter(room => room !== state.currentRoom.id)
            ];

            return {
                ...state,
                availableRooms: newAvailableRooms
            };
        },
        updateMessage: (state, action) => {
            if (!state.currentRoom) return state;

            const messages = [...state.currentRoom.messages];
            const indexOfMessage = messages.findIndex(msg => msg.id === action.payload);
            messages[indexOfMessage] = {
                ...messages[indexOfMessage],
                currentStatus: MESSAGE_STATUS.SENDED
            };

            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    messages,
                    quantityOfMessages: messages.length
                }
            };
        },
        insertMessage: (state, action) => {
            if (state.currentRoom && state.currentRoom.messages) {
                const newArrayOfMessages = [...state.currentRoom.messages, action.payload];

                return {
                    ...state,
                    currentRoom: {
                        ...state.currentRoom,
                        messages: newArrayOfMessages,
                        quantityOfMessages: newArrayOfMessages.length
                    }
                };
            }

            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    messages: [action.payload],
                    quantityOfMessages: 1
                }
            };
        },
        newMessageOnRoom: (state, action) => {
            const currentAvailableRooms = [...state.availableRooms];

            const newAvailableRooms = currentAvailableRooms.map(room => {
                if (room.id === action.payload) {
                    return {
                        ...room,
                        badge: room.badge + 1
                    };
                }

                return room;
            });

            return {
                ...state,
                availableRooms: newAvailableRooms
            };
        },
        removeBadges: (state, action) => {
            const currentAvailableRooms = [...state.availableRooms];

            const newAvailableRooms = currentAvailableRooms.map(room => {
                if (room.id === action.payload) {
                    return {
                        ...room,
                        badge: 0
                    };
                }

                return room;
            });

            return {
                ...state,
                availableRooms: newAvailableRooms
            };
        },
        insertMessageFromInput: (state, action) => {
            if (state.currentRoom && state.currentRoom.messages) {
                const message = messageAdapter.inputToMessages(action.payload);

                return {
                    ...state,
                    currentRoom: {
                        ...state.currentRoom,
                        messages: [...state.currentRoom.messages, message],
                        quantityOfMessages: state.currentRoom.messages.length + 1
                    }
                };
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createRoom.pending, createRoomPending)
            .addCase(createRoom.fulfilled, createRoomFulfilled)
            .addCase(createRoom.rejected, createRoomRejected)
            .addCase(getRoom.pending, getRoomPending)
            .addCase(getRoom.fulfilled, getRoomFulfilled)
            .addCase(getRoom.rejected, getRoomRejected)
            .addCase(closeRoom.pending, closeRoomPending)
            .addCase(closeRoom.fulfilled, closeRoomFulfilled)
            .addCase(closeRoom.rejected, closeRoomRejected)
            .addCase(getUserAvailablesRooms.pending, getUserAvailablesRoomsPending)
            .addCase(getUserAvailablesRooms.fulfilled, getUserAvailablesRoomsFulfilled)
            .addCase(getUserAvailablesRooms.rejected, getUserAvailablesRoomsRejected)
            .addCase(getMoreMessages.pending, getMoreMessagesPending)
            .addCase(getMoreMessages.fulfilled, getMoreMessagesFulfilled)
            .addCase(getMoreMessages.rejected, getMoreMessagesRejected);
    }
});

export const {
    setContacts,
    setShowNewRoomSection,
    setSelectedRoomUser,
    closeError,
    setCurrentRoom,
    respondToCloseRoom,
    updateMessage,
    insertMessage,
    newMessageOnRoom,
    removeBadges,
    pushToAvailableRooms,
    insertMessageFromInput
} = channelSlice.actions;

export default channelSlice.reducer;
