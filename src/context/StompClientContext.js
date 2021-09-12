import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { selectUserToken } from '../redux/user/userSlice.reducer';

import { API_CONSTANTS } from '../constants/api.constants';
import { ACK_VALUES } from '../constants/stomp.constants';

import { getHallSubscriptionId, getRoomSubscriptionId } from '../utils/stomp.utils';

const StompClientContext = createContext({});

const StompClientContextProvider = ({ children }) => {
    const userToken = useSelector(selectUserToken);

    const [connected, setConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

    const addHallSubscriber = onReceiveMessage => {
        return subscribe(
            API_CONSTANTS.WEB_SOCKET.USER +
            API_CONSTANTS.URL_PARAM(userToken) +
            API_CONSTANTS.WEB_SOCKET.QUEUE +
            API_CONSTANTS.WEB_SOCKET.ROOMS,
            onReceiveMessage,
            {
                id: getHallSubscriptionId(userToken),
                ack: ACK_VALUES.AUTO
            }
        );
    }

    const addRoomSubscriber = (recipientToken, roomToken, onReceiveMessage) => {
        return subscribe(
            API_CONSTANTS.WEB_SOCKET.USER +
            API_CONSTANTS.URL_PARAM(recipientToken) +
            API_CONSTANTS.WEB_SOCKET.QUEUE +
            API_CONSTANTS.WEB_SOCKET.ROOMS +
            API_CONSTANTS.URL_PARAM(roomToken),
            onReceiveMessage,
            {
                id: getRoomSubscriptionId(userToken, roomToken),
                ack: ACK_VALUES.AUTO // TODO: Estar a possibilidade da implantação dos valores client, client-individual.
            }
        );
    }

    const subscribe = (destination, callback, header = {}) => {
        return stompClient.subscribe(destination, callback, header);
    }

    /**
     * @todo Adicionar a função para remover a inscrição.
     */
    const clearSubscriber = onReceiveMessage => {
        /**
         * @type {Stomp.Client}
         */
        const client = stompClient;
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
        <StompClientContext.Provider value={{
            connected,
            addHallSubscriber,
            addRoomSubscriber,
            send
        }}>
            {children}
        </StompClientContext.Provider>
    );
}

/**
 * @returns {{
 *  connected: boolean,
 *  addHallSubscriber: (onReceiveMessage: void) => Stomp.Subscription,
 *  addRoomSubscriber: (roomToken: string, onReceiveMessage: void) => Stomp.Subscription,
 *  send: (payload: { roomToken: string, content: string, type: 'TEXT' | 'IMAGE' }) => void
 * }}
 */
const useStompClientContext = () => useContext(StompClientContext);

const withStompClientContext = Component => () => (
	<StompClientContextProvider>
		<Component />
	</StompClientContextProvider>
);

export { useStompClientContext, withStompClientContext }
