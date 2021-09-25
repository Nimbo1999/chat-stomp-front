import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import getUserAvailablesRooms from '../redux/channel/getUserAvailablesRooms.action';
import getRoomAction from '../redux/channel/getRoom.action';
import { newMessageOnRoom, pushToAvailableRooms } from '../redux/channel/channel.reducer';
import { selectCurrentRoomToken, selectAvailableRooms } from '../redux/channel/channel.selector';
import { selectUserToken } from '../redux/user/userSlice.reducer';

import { useStompClientContext } from './StompClientContext';

const HallContext = createContext({});

const HallContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { addHallSubscriber, connected, begin } = useStompClientContext();

    const currentRoomToken = useSelector(selectCurrentRoomToken);
    const availableRooms = useSelector(selectAvailableRooms);
    const userToken = useSelector(selectUserToken);

    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        if (!connected) return;

        if (!subscription) {
            setSubscription(addHallSubscriber(onReceiveMessage));
        }
    }, [subscription, connected]);

    useEffect(() => {
        if (subscription && subscription.unsubscribe) {
            subscription.unsubscribe();
            setSubscription(null);
        }
    }, [currentRoomToken, availableRooms]);

    const onReceiveMessage = stompMessage => {
        const { body, ack, nack } = stompMessage;

        const payload = JSON.parse(body);

        return incomingMessageHandler(payload, ack, nack);
    };

    const incomingMessageHandler = (payload, ack, nack) => {
        const transaction = begin();

        if (!payload.token || currentRoomToken === payload.token) {
            ack({ transaction: transaction.id });
            transaction.commit();
            return;
        }

        const { sender, recipient } = payload;

        showMessageToasty(sender, recipient);

        if (hasOpenedRoomWithPayloadToken(payload)) {
            ack({ transaction: transaction.id });
            transaction.commit();
            return dispatch(newMessageOnRoom(payload.token));
        }

        try {
            getRoomContent({
                roomToken: payload.token,
                onSuccess: room => {
                    ack({ transaction: transaction.id });
                    transaction.commit();

                    onGetRoomContentSuccess(room);
                }
            });
        } catch (err) {
            nack({ transaction: transaction.id });

            transaction.commit();
        }
    };

    const showMessageToasty = (sender, recipient) => {
        if (sender.token === userToken) {
            return message.info(`Nova mensagem de ${recipient.name}`);
        }

        return message.info(`Nova mensagem de ${sender.name}`);
    };

    const getRoomContent = payload => dispatch(getRoomAction(payload));

    const onGetRoomContentSuccess = room =>
        dispatch(
            pushToAvailableRooms({
                ...room,
                badge: 1
            })
        );

    const hasOpenedRoomWithPayloadToken = payload =>
        availableRooms.some(({ token }) => token === payload.token);

    const getAvailableRooms = () => dispatch(getUserAvailablesRooms());

    useEffect(() => getAvailableRooms(), []);

    return <HallContext.Provider>{children}</HallContext.Provider>;
};

const useHallContext = () => useContext(HallContext);

const withHallContext = Component => () =>
    (
        <HallContextProvider>
            <Component />
        </HallContextProvider>
    );

export { useHallContext, withHallContext };
