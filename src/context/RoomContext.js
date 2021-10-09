import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserToken } from '../redux/user/userSlice.reducer';
import {
    selectCurrentRoomToken,
    selectCurrentRoomRecipientToken
} from '../redux/channel/channel.selector';
import { insertMessage } from '../redux/channel/channel.reducer';

import { useStompClientContext } from './StompClientContext';

import MessagesService from '../services/Messages';

const RoomContext = createContext({});

const messagesService = new MessagesService();

const RoomContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { send, addRoomSubscriber, begin } = useStompClientContext();

    const userToken = useSelector(selectUserToken);
    const currentRoomToken = useSelector(selectCurrentRoomToken);
    const currentRoomRecipientToken = useSelector(selectCurrentRoomRecipientToken);

    const [subscription, setSubscription] = useState(null);

    const [textMessage, setTextMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentRoomToken || !currentRoomRecipientToken) return;

        if (!subscription) {
            return setSubscription(
                addRoomSubscriber(currentRoomRecipientToken, currentRoomToken, onReceiveMessage)
            );
        }

        return () => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();

                setSubscription(null);
            }
        };
    }, [subscription, currentRoomToken]);

    const onReceiveMessage = stompMessage => {
        const { body, ack, nack } = stompMessage;
        const payload = JSON.parse(body);

        return incomingMessageHandler(payload, ack, nack);
    };

    const incomingMessageHandler = async (payload, ack, nack) => {
        try {
            const data = await messagesService.getMessage(payload.messageToken);

            includeMessageInChat({
                text: data.content,
                date: data.timestamp,
                token: payload.messageToken,
                userToken: data.userToken
            });

            if (data.userToken !== userToken) {
                ack();
            }
        } catch (err) {
            nack();
        }
    };

    const includeMessageInChat = payload => dispatch(insertMessage(payload));

    const onSubmitMessage = event => {
        event.preventDefault();
        const transaction = begin();

        if (!textMessage) setError('Esse campo é obrigatório!');

        const message = {
            roomToken: currentRoomToken,
            content: textMessage,
            type: 'TEXT',
            userToken
        };

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
