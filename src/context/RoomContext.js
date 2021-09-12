import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserToken } from '../redux/user/userSlice.reducer';
import { selectCurrentRoomToken, selectCurrentRoomRecipientToken } from '../redux/channel/channel.selector';
import { insertMessage } from '../redux/channel/channel.reducer';

import { useStompClientContext } from './StompClientContext';

import MessagesService from '../services/Messages';

const RoomContext = createContext({});

const messagesService = new MessagesService();

const RoomContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { send, addRoomSubscriber  } = useStompClientContext();

    const userToken = useSelector(selectUserToken);
    const currentRoomToken = useSelector(selectCurrentRoomToken);
    const currentRoomRecipientToken = useSelector(selectCurrentRoomRecipientToken);

    const [subscription, setSubscription] = useState(null);

    const [textMessage, setTextMessage] = useState('');
    const [error, setError] = useState('');

    const onReceiveMessage = stompMessage => {
        const { body } = stompMessage;
        const payload = JSON.parse(body);

        return incomingMessageHandler(payload);
    }

    const incomingMessageHandler = async payload => {
        const data = await messagesService.getMessage(payload.messageToken);

        console.log({ data });

        // Caso a sala atual estiver aberta.
        return addIncomingMessageToCurrentChatRoom({
            text: data.content,
            date: data.timestamp,
            token: payload.messageToken,
            userToken: payload.messageOwner
        });
    }

    const addIncomingMessageToCurrentChatRoom = payload => includeMessageInChat(payload);

    const includeMessageInChat = payload => dispatch(
        insertMessage(payload)
    );

    const onSubmitMessage = event => {
        event.preventDefault();

        if (!textMessage) setError('Esse campo é obrigatório!');

        const message = {
            roomToken: currentRoomToken,
            content: textMessage,
            type: 'TEXT',
            userToken
        };

        send(message);
        setTextMessage('');
    }

    const handleOnChangeMessage = ({ target }) => {
        const { value } = target;

        if (error) setError('');

        setTextMessage(value.trimStart());
    }

    useEffect(() => {
        if (!currentRoomToken || !currentRoomRecipientToken) return;

        if (!subscription) {
            setSubscription(
                addRoomSubscriber(currentRoomRecipientToken, currentRoomToken, onReceiveMessage)
            );
        }

        if (subscription) {
            console.log({ subscription, message: 'Room subscription atual' });
        }

        return () => {
            console.log('unMount of RoomContext');
        }

    }, [subscription, currentRoomToken]);

    return (
        <RoomContext.Provider
            value={{
                onSubmitMessage,
                handleOnChangeMessage,
                textMessage,
                error
            }}
        >
            {children}
        </RoomContext.Provider>
    );
}

const useRoomContext = () => useContext(RoomContext);

const withRoomContext = Component => () => (
	<RoomContextProvider>
		<Component />
	</RoomContextProvider>
);

export { useRoomContext, withRoomContext }
