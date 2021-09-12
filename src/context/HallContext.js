import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import getUserAvailablesRooms from '../redux/channel/getUserAvailablesRooms.action';
import { selectUserToken } from '../redux/user/userSlice.reducer';
import { selectCurrentRoomToken, selectCurrentRoomMessages } from '../redux/channel/channel.selector';
import { insertIncomingMessage } from '../redux/channel/channel.reducer';

import { useStompProvider } from './StompClient';

import MessagesService from '../services/Messages';

const HallContext = createContext({});

const messagesService = new MessagesService();

const HallContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { send, addSubscriber, connected } = useStompProvider();

    const userToken = useSelector(selectUserToken);
    const currentRoomToken = useSelector(selectCurrentRoomToken);
    const currentRoomMessages = useSelector(selectCurrentRoomMessages);

    const [subscription, setSubscription] = useState(null);

    const [textMessage, setTextMessage] = useState('');
    const [error, setError] = useState('');

    const showMessageToasty = senderName => message.info(`Nova mensagem de ${senderName}`);

    const addIncomingMessageToCurrentChatRoom = content => dispatch(
        insertIncomingMessage([
            ...currentRoomMessages,
            {
                text: content,
                date: new Date(),
                userToken,
            }
        ])
    );

    const incomingMessageHandler = async payload => {
        showMessageToasty(payload.senderName);

        const data = await messagesService.getMessage(payload.id);

        console.log({ data });

        // Caso possuir uma sala atual.
        if (currentRoomToken && currentRoomToken === data.roomToken) {
            return addIncomingMessageToCurrentChatRoom(data.content);
        }

        // TODO: Adicionat função para adicionar um badge a sala que possui uma nova mensagem.
        console.log('Adicionar um badge nos envolvidos.');
    }

    const onReceiveMessage = stompMessage => {
        const { body } = stompMessage;
        const payload = JSON.parse(body);

        return incomingMessageHandler(payload);
    }

    const onSubmitMessage = event => {
        event.preventDefault();

        if (!textMessage) setError('Esse campo é obrigatório!');

        const message = {
            roomToken: currentRoomToken,
            content: textMessage,
            type: 'TEXT'
        };

        send(message);
        setTextMessage('');
    }

    const handleOnChangeMessage = ({ target }) => {
        const { value } = target;

        setError('');
        setTextMessage(value.trimStart());
    }

    useEffect(() => {
        if (!connected) return;

        if (!subscription) {
            setSubscription(
                addSubscriber(onReceiveMessage)
            );
        }

        if (subscription) {
            console.log({ subscription, message: 'Inscrição atual' });
        }

        return () => {
            console.log('unMount of HallContext');
        }

    }, [subscription, connected]);

    useEffect(() => {
        dispatch(getUserAvailablesRooms());
    }, []);

    return (
        <HallContext.Provider
            value={{
                onSubmitMessage,
                handleOnChangeMessage,
                textMessage,
                error
            }}
        >
            {children}
        </HallContext.Provider>
    );
}

const useHallContext = () => useContext(HallContext);

const withHallContext = Component => () => (
	<HallContextProvider>
		<Component />
	</HallContextProvider>
);

export { useHallContext, withHallContext }
