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

    const showMessageToasty = senderName => message.info(`Nova mensagem de ${senderName}`);

    const incomingMessageHandler = async payload => {
        showMessageToasty(payload.senderName);
        console.log({ payload });

        if (currentRoomToken === payload.token) return;

        return dispatch(newMessageOnRoom(payload.token));
    }

    const onReceiveMessage = stompMessage => {
        const { body } = stompMessage;
        const payload = JSON.parse(body);

        return incomingMessageHandler(payload);
    }

    useEffect(() => {
        if (!connected) return;

        if (!subscription) {
            setSubscription(
                addHallSubscriber(onReceiveMessage)
            );
        }

        if (subscription) {
            console.log({ subscription, message: 'Hall subscription atual' });
        }

        return () => {
            console.log('unMount of HallContext');
        }

    }, [subscription, connected]);

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
