import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import getUserAvailablesRooms from '../redux/channel/getUserAvailablesRooms.action';
import { selectUserToken } from '../redux/user/userSlice.reducer';
import { selectCurrentRoom } from '../redux/channel/channel.selector';
import { insertIncomingMessage } from '../redux/channel/channel.reducer';

import MessagesService from '../services/Messages';

import { API_CONSTANTS } from '../constants/api.constants';

const StompClientContext = createContext({});

// TODO: Levar para o contexto das salas
const messagesService = new MessagesService();

const StompClientContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const userToken = useSelector(selectUserToken);
    // TODO: Levar para o contexto das salas.
    const currentRoom = useSelector(selectCurrentRoom);

    const [stompClient, setStompClient] = useState(null);

    // TODO Levar para o contexto das salas.
    const [textMessage, setTextMessage] = useState('');
    const [error, setError] = useState('');

    // TODO: Levar essa função para o contexto das salas. e passa como argumento do addSubscriber
    const onReceiveMessage = async stompMessage => {
        const { body } = stompMessage;
        const payload = JSON.parse(body);

        message.info(`Nova mensagem de ${payload.senderName}`);

        const data = await messagesService.getMessage(payload.id);

        if (currentRoom && currentRoom.token === data.roomToken) {

            dispatch(
                insertIncomingMessage([
                    ...currentRoom.messages,
                    {
                        text: data.content,
                        date: new Date(),
                        userToken,
                    }
                ])
            );

        }
    }

    const addSubscriber = onReceiveMessage => {
        stompClient.subscribe(
            API_CONSTANTS.WEB_SOCKET.USER +
            API_CONSTANTS.URL_PARAM(userToken) +
            API_CONSTANTS.WEB_SOCKET.QUEUE +
            API_CONSTANTS.WEB_SOCKET.MESSAGES,
            onReceiveMessage
        );
    }

    const initializeStompClient = () => {
        const socketConnection = new SockJS(
            API_CONSTANTS.BASE_URL.concat(API_CONSTANTS.WEB_SOCKET.ROOT)
        );

        const client = Stomp.over(socketConnection);

        setStompClient(client);
    }

    // TODO: Levar essa função para o contexto das salas
    const onSubmitMessage = event => {
        event.preventDefault();

        if (!textMessage) setError('Esse campo é obrigatório!');

        const message = {
            roomToken: currentRoom.token,
            content: textMessage,
            type: 'TEXT'
        };

        stompClient.send('/app/chat', {}, JSON.stringify(message));

        setTextMessage('');
    }

    // TODO: Levar essa função para o contexto das salas
    const handleOnChangeMessage = ({ target }) => {
        const { value } = target;

        setError('');
        setTextMessage(value.trimStart());
    }

    useEffect(() => {

        if (stompClient === null) {

            initializeStompClient();

        } else {

            stompClient.connect(
                {},
                () => console.log('Connected to STOMP!!!'),
                err => console.error(err)
            );

        }

    }, [stompClient]);

    // TODO: Remover essa chamada desse contexto.
    useEffect(() => {
        dispatch(getUserAvailablesRooms());
    }, []);

    return (
        <StompClientContext.Provider
            value={{
                onSubmitMessage,
                handleOnChangeMessage,
                addSubscriber,
                textMessage,
                error
            }}
        >
            {children}
        </StompClientContext.Provider>
    );
}

const useStompProvider = () => useContext(StompClientContext);

const withStompClient = Component => () => (
	<StompClientContextProvider>
		<Component />
	</StompClientContextProvider>
);

export { useStompProvider, withStompClient }
