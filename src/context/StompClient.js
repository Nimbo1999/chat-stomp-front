import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { selectUserToken } from '../redux/user/userSlice.reducer';
import { selectCurrentRoom } from '../redux/channel/channel.selector';

import { API_CONSTANTS } from '../constants/api.constants';
// import { MESSAGE_STATUS } from '../constants/message';

const StompClientContext = createContext({});

const StompClientContextProvider = ({ children }) => {

    const userToken = useSelector(selectUserToken);
    const currentRoom = useSelector(selectCurrentRoom);

    const [stompClient, setStompClient] = useState(null);

    const [textMessage, setTextMessage] = useState('');
    const [error, setError] = useState('');

    const onReceiveMessage = stompMessage => {
        const { body } = stompMessage;

        const payload = JSON.parse(body);

        message.info(`Nova mensagem de ${payload.senderName}`);
    }

    const onConnected = stompFrame => {
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

        setStompClient(Stomp.over(socketConnection));
    }

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
                onConnected,
                err => console.error(err)
            );

        }

    }, [stompClient]);

    return (
        <StompClientContext.Provider
            value={{
                onSubmitMessage,
                handleOnChangeMessage,
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
