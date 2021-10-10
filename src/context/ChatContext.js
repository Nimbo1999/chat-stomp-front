import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectCurrentRoomMessages,
    selectCurrentRoomQuantityOfMessages
} from '../redux/channel/channel.selector';
import getMoreMessages from '../redux/channel/getMessages.action';

const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const messages = useSelector(selectCurrentRoomMessages);
    const quantityOfMessages = useSelector(selectCurrentRoomQuantityOfMessages);

    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);

    const onGetMoreMessagesSuccess = payload => {
        const totalNumberOfAcummulatedMessages = payload.length + messages.length;

        if (totalNumberOfAcummulatedMessages < quantityOfMessages) {
            return setHasNextPage(true);
        }

        setHasNextPage(false);
    };

    useEffect(() => {
        dispatch(getMoreMessages({ page, onSuccess: onGetMoreMessagesSuccess }));
    }, []);

    /**
     * @todo Finalizar a função de recuperar mais mensagens de uma sala.
     *  */
    const loadMoreRows = () => {
        console.log('loadMoreRows call!!');
        console.log('Get more messages callback, current on page ', page);
    };

    const isRowLoaded = ({ index }) => !!messages[index];

    const numberOfRows = hasNextPage ? messages.length + 1 : messages.length;

    return (
        <ChatContext.Provider
            value={{ messages, quantityOfMessages, numberOfRows, loadMoreRows, isRowLoaded }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);

const withChatContext = Component => () =>
    (
        <ChatContextProvider>
            <Component />
        </ChatContextProvider>
    );

export { useChatContext, withChatContext };
