import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import getUserAvailablesRooms from '../redux/channel/getUserAvailablesRooms.action';
import { newMessageOnRoom } from '../redux/channel/channel.reducer';
import { selectCurrentRoomToken } from '../redux/channel/channel.selector';

import { useStompClientContext } from './StompClientContext';

const HallContext = createContext({});

const HallContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { addHallSubscriber, connected } = useStompClientContext();

    const currentRoomToken = useSelector(selectCurrentRoomToken);

    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        if (!connected) return;

        if (!subscription) {
            setSubscription(
                addHallSubscriber(onReceiveMessage)
            );
        }

    }, [subscription, connected]);

    useEffect(() => {

        if (subscription && subscription.unsubscribe) {
            subscription.unsubscribe();
            setSubscription(null);
        }

    }, [currentRoomToken]);

    const onReceiveMessage = stompMessage => {
        const { body } = stompMessage;
        const payload = JSON.parse(body);

        return incomingMessageHandler(payload);
    }

    const incomingMessageHandler = async payload => {
        if (currentRoomToken === payload.token) return;

        showMessageToasty(payload.senderName);

        return dispatch(newMessageOnRoom(payload.token));
    }

    const showMessageToasty = senderName => message.info(`Nova mensagem de ${senderName}`);

    const getAvailableRooms = () => dispatch(getUserAvailablesRooms());

    useEffect(() => getAvailableRooms(), []);

    return (
        <HallContext.Provider>
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
