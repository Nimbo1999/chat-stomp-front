import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { selectUserToken } from '../redux/user/userSlice.reducer';
import {
    selectCurrentRoomId,
    selectCurrentRoomRecipientToken
} from '../redux/channel/channel.selector';
import {
    insertMessage,
    insertMessageFromInput,
    updateMessage
} from '../redux/channel/channel.reducer';
import { registerMessage, removeMessage } from '../redux/unsentMessages/unsentMessages.reducer';
import { selectRoomIdMessages } from '../redux/unsentMessages/unsentMessages.selector';

import messageAdapter from '../adapters/message.adapter';

import { useStompClientContext } from './StompClientContext';

import MessagesService from '../services/Messages';

import audio from '../assets/audios/new-message-room.mp3';

const RoomContext = createContext({});

const messagesService = new MessagesService();

const RoomContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { send, addRoomSubscriber, begin, connected } = useStompClientContext();

    const userToken = useSelector(selectUserToken);
    const currentRoomId = useSelector(selectCurrentRoomId);
    const currentRoomRecipientToken = useSelector(selectCurrentRoomRecipientToken);
    const roomIdStashMessages = useSelector(selectRoomIdMessages);
    const audioRef = useRef(new Audio(audio));

    const [subscription, setSubscription] = useState(null);

    const [textMessage, setTextMessage] = useState('');
    const [error, setError] = useState('');

    const unSubscribeToRoom = () => {
        subscription.unsubscribe();
        setSubscription(null);
    };

    useEffect(() => {
        if (!connected && subscription && subscription.unsubscribe) {
            return unSubscribeToRoom();
        }

        if (!currentRoomId || !currentRoomRecipientToken) return;

        if (connected && !subscription) {
            setSubscription(
                addRoomSubscriber(currentRoomRecipientToken, currentRoomId, onReceiveMessage)
            );
            return sendStashMessagesOfRoomIdIfExist();
        }

        return () => {
            if (subscription && subscription.unsubscribe) {
                unSubscribeToRoom();
            }
        };
    }, [subscription, currentRoomId, connected]);

    const onReceiveMessage = stompMessage => {
        const { body, ack, nack } = stompMessage;
        const payload = JSON.parse(body);

        return incomingMessageHandler(payload, ack, nack);
    };

    const includeMessageInChat = payload => dispatch(insertMessage(payload));
    const includeMessageInStashArea = payload => dispatch(registerMessage(payload));

    const updateChatMessage = payload => dispatch(updateMessage(payload));
    const removeMessageFromStashArea = payload => dispatch(removeMessage(payload));

    const incomingMessageHandler = async (payload, ack, nack) => {
        try {
            const data = await messagesService.getMessage(payload.messageId);
            audioRef.current.play();
            const removeMessageFromStashPayload = {
                messageId: payload.messageId,
                roomId: currentRoomId
            };
            if (data.userToken === userToken) {
                updateChatMessage(payload.messageId);
                return removeMessageFromStashArea(removeMessageFromStashPayload);
            }
            removeMessageFromStashArea(removeMessageFromStashPayload);
            includeMessageInChat({
                text: data.content,
                date: data.timestamp,
                token: payload.messageId,
                userToken: data.userToken
            });
            ack({ receipt: payload.messageId });
        } catch (err) {
            nack({ receipt: payload.messageId });
        }
    };

    const sendStashMessagesOfRoomIdIfExist = () => {
        if (!roomIdStashMessages || !roomIdStashMessages.length) return;

        const orderedMessages = roomIdStashMessages.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        for (const iterator of orderedMessages) {
            const message = messageAdapter.messageToStompRequest(currentRoomId, iterator);
            send(message);
        }
    };

    const onSubmitMessage = event => {
        event.preventDefault();
        const transaction = begin();

        if (!textMessage) {
            transaction.abort();
            return setError('Esse campo ?? obrigat??rio!');
        }

        const message = {
            messageId: uuidv4(),
            roomId: currentRoomId,
            content: textMessage,
            timestamp: new Date().getTime(),
            messageOwnerToken: userToken
        };

        dispatch(insertMessageFromInput(message));
        const payload = {
            message: messageAdapter.inputToMessages(message),
            roomId: currentRoomId
        };
        includeMessageInStashArea(payload);
        send(message, transaction);
        setTextMessage('');
        transaction.commit();
    };

    const handleOnChangeMessage = ({ target }) => {
        const { value } = target;

        if (error) setError('');

        setTextMessage(value.trimStart());
    };

    return (
        <RoomContext.Provider
            value={{
                onSubmitMessage,
                handleOnChangeMessage,
                textMessage,
                error,
                subscription
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

const useRoomContext = () => useContext(RoomContext);

const withRoomContext = Component => () =>
    (
        <RoomContextProvider>
            <Component />
        </RoomContextProvider>
    );

export { useRoomContext, withRoomContext };
