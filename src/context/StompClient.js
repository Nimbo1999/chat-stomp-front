import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { selectUserToken } from '../redux/user/userSlice.reducer';

import { API_CONSTANTS } from '../constants/api.constants';

const StompClientContext = createContext({});

const StompClientContextProvider = ({ children }) => {

    const userToken = useSelector(selectUserToken);
    const [stompClient, setStompClient] = useState(null);

    const onReceiveMessage = message => {
        console.log('onReceiveMessage');

        console.log({ message });
    }

    const onConnected = stompFrame => {
        console.log('CONNECTED TO STOMP!!!!!');
        console.log('CONNECTED TO STOMP!!!!!');
        console.log('CONNECTED TO STOMP!!!!!');
        console.log('CONNECTED TO STOMP!!!!!');
        console.log({ stompFrame, stompClient });

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
        <StompClientContext.Provider>
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
