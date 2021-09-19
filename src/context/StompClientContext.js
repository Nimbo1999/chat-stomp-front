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

    const addHallSubscriber = onReceiveMessage => subscribe(
        API_CONSTANTS.WEB_SOCKET.USER +
        API_CONSTANTS.URL_PARAM(userToken) +
        API_CONSTANTS.WEB_SOCKET.QUEUE +
        API_CONSTANTS.WEB_SOCKET.ROOMS,
        onReceiveMessage,
        {
            id: getHallSubscriptionId(userToken),
            ack: ACK_VALUES.CLIENT_INDIVIDUAL
        }
    );

    const addRoomSubscriber = (recipientToken, roomToken, onReceiveMessage) => subscribe(
        API_CONSTANTS.WEB_SOCKET.USER +
        API_CONSTANTS.URL_PARAM(recipientToken) +
        API_CONSTANTS.WEB_SOCKET.QUEUE +
        API_CONSTANTS.WEB_SOCKET.ROOMS +
        API_CONSTANTS.URL_PARAM(roomToken),
        onReceiveMessage,
        {
            id: getRoomSubscriptionId(userToken, roomToken),
            ack: ACK_VALUES.CLIENT
        }
    );

    const subscribe = (destination, callback, header = {}) => stompClient.subscribe(
        destination,
        callback,
        header
    );

    const send = (payload, transaction) => {
        const destination = API_CONSTANTS.WEB_SOCKET.APP + API_CONSTANTS.WEB_SOCKET.CHAT;

        if (transaction && transaction.id) {
            const sendHeader = {
                transaction: transaction.id
            };

            return stompClient.send(destination, sendHeader, JSON.stringify(payload));
        }

        return stompClient.send(destination, {}, JSON.stringify(payload));
    }

    const begin = () => stompClient.begin();

    const initializeStompClient = () => {
        const socketConnection = new SockJS(
            API_CONSTANTS.BASE_URL.concat(API_CONSTANTS.WEB_SOCKET.ROOT)
        );

        const client = Stomp.over(socketConnection);

        setStompClient(client);
    }

    const onConnectionSucceeded = () => setConnected(true);

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
            send,
            begin
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
 *  begin: () => { abort: () => void, commit: () => void, id: string }
 * }}
 */
const useStompClientContext = () => useContext(StompClientContext);

const withStompClientContext = Component => () => (
	<StompClientContextProvider>
		<Component />
	</StompClientContextProvider>
);

export { useStompClientContext, withStompClientContext }
