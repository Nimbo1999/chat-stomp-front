import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import getUserAvailablesRooms from '../redux/channel/getUserAvailablesRooms.action';

import { useStompProvider } from './StompClient';

const HallContext = createContext({});

const HallContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { addHallSubscriber, connected } = useStompProvider();

    const [subscription, setSubscription] = useState(null);

    const showMessageToasty = senderName => message.info(`Nova mensagem de ${senderName}`);

    const incomingMessageHandler = async payload => {
        showMessageToasty(payload.senderName);

        // TODO: Adicionat função para adicionar um badge a sala que possui uma nova mensagem.
        console.log({ payload });
        console.log('Adicionar um badge nos envolvidos.');
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
