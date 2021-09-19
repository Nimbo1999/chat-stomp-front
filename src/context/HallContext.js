import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import getUserAvailablesRooms from '../redux/channel/getUserAvailablesRooms.action';
import getRoomAction from '../redux/channel/getRoom.action';
import { newMessageOnRoom, pushToAvailableRooms } from '../redux/channel/channel.reducer';
import { selectCurrentRoomToken, selectAvailableRooms } from '../redux/channel/channel.selector';

import { useStompClientContext } from './StompClientContext';

const HallContext = createContext({});

const HallContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { addHallSubscriber, connected, begin } = useStompClientContext();

    const currentRoomToken = useSelector(selectCurrentRoomToken);
    const availableRooms = useSelector(selectAvailableRooms);

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

    }, [currentRoomToken, availableRooms]);

    const onReceiveMessage = stompMessage => {
        const { body, ack } = stompMessage;

        const payload = JSON.parse(body);

        return incomingMessageHandler(payload, ack);
    }

    const incomingMessageHandler = (payload, ack) => {
        if (!payload.token || currentRoomToken === payload.token) return;

        const transaction = begin();

        ack({ transaction: transaction.id });

        showMessageToasty(payload.senderName);

        if (hasOpenedRoomWithPayloadToken(payload)) {
            return dispatch(newMessageOnRoom(payload.token));
        }

        getRoomContent({
            roomToken: payload.token,
            onSuccess: onGetRoomContentSuccess
        });

        transaction.commit();
    }

    const showMessageToasty = senderName => message.info(`Nova mensagem de ${senderName}`);

    const getRoomContent = payload => dispatch(
        getRoomAction(payload)
    );

    const onGetRoomContentSuccess = room => dispatch(
        pushToAvailableRooms({
            ...room,
            badge: 1
        })
    );

    const hasOpenedRoomWithPayloadToken = payload => availableRooms
        .some(({ token }) => token === payload.token);

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
