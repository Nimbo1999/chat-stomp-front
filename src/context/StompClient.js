import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { selectUserToken } from '../redux/user/userSlice.reducer';

import { API_CONSTANTS } from '../constants/api.constants';

const StompClientContext = createContext({});

const StompClientContextProvider = ({ children }) => {
    const userToken = useSelector(selectUserToken);

    const [connected, setConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

    const addSubscriber = onReceiveMessage => {
        const subscription = stompClient.subscribe(
            API_CONSTANTS.WEB_SOCKET.USER +
            API_CONSTANTS.URL_PARAM(userToken) +
            API_CONSTANTS.WEB_SOCKET.QUEUE +
            API_CONSTANTS.WEB_SOCKET.MESSAGES,
            onReceiveMessage
        );

        return subscription;
    }

    const clearSubscriber = onReceiveMessage => {
        /**
         * @type {Stomp.Client}
         */
        // const client = stompClient;
    }

    const send = payload => {
        stompClient.send('/app/chat', {}, JSON.stringify(payload));
    }

    const initializeStompClient = () => {
        const socketConnection = new SockJS(
            API_CONSTANTS.BASE_URL.concat(API_CONSTANTS.WEB_SOCKET.ROOT)
        );

        const client = Stomp.over(socketConnection);

        setStompClient(client);
    }

    const onConnectionSucceeded = payload => {
        setConnected(true);
        console.log('Connected to STOMP!!!')
        console.log({ payload });
    }

    useEffect(() => {

        if (stompClient === null) {
            initializeStompClient();
        } else {
            stompClient.connect(
                {},
                onConnectionSucceeded,
                err => console.error(err)
            );
        }

    }, [stompClient]);

    return (
        <StompClientContext.Provider value={{ connected, addSubscriber, send }}>
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
