import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { selectUserToken } from '../redux/user/userSlice.reducer';
import {
    selectCurrentRoomId,
    selectCurrentRoomRecipientToken
} from '../redux/channel/channel.selector';
import {
    insertMessage,
    setCurrentRoom,
    insertMessageFromInput,
    updateMessage
} from '../redux/channel/channel.reducer';

import { useStompClientContext } from './StompClientContext';

import MessagesService from '../services/Messages';

import audio from '../assets/audios/new-message-room.mp3';

const RoomContext = createContext({});

const messagesService = new MessagesService();

const RoomContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { send, addRoomSubscriber, begin, connected } = useStompClientContext();

    const userToken = useSelector(selectUserToken);
    const currentRoomId = useSelector(selectCurrentRoomId);
    const currentRoomRecipientToken = useSelector(selectCurrentRoomRecipientToken);
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
            unSubscribeToRoom();
            dispatch(setCurrentRoom(null));
            return history.goBack();
        }

        if (!currentRoomId || !currentRoomRecipientToken) return;

        if (connected && !subscription) {
            return setSubscription(
                addRoomSubscriber(currentRoomRecipientToken, currentRoomId, onReceiveMessage)
            );
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

    const incomingMessageHandler = async (payload, ack, nack) => {
        try {
            const data = await messagesService.getMessage(payload.messageId);

            if (data.userToken === userToken) {
                audioRef.current.play();
                return updateChatMessage(payload.messageId);
            }

            audioRef.current.play();
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

    const includeMessageInChat = payload => dispatch(insertMessage(payload));
    const updateChatMessage = payload => dispatch(updateMessage(payload));

    const onSubmitMessage = event => {
        event.preventDefault();
        const transaction = begin();

        if (!textMessage) {
            transaction.abort();
            return setError('Esse campo é obrigatório!');
        }

        const message = {
            messageId: uuidv4(),
            roomId: currentRoomId,
            content: textMessage,
            timestamp: new Date().getTime(),
            messageOwnerToken: userToken
        };

        dispatch(insertMessageFromInput(message));
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
