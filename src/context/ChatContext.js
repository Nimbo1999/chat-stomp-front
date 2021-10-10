import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectCurrentRoomMessages,
    selectCurrentRoomQuantityOfMessages,
    selectCurrentLoadedMessagesLength
} from '../redux/channel/channel.selector';
import getMoreMessagesAction from '../redux/channel/getMoreMessages.action';

const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const listRef = useRef(null);

    const messages = useSelector(selectCurrentRoomMessages);
    const currentLoadedMessagesLength = useSelector(selectCurrentLoadedMessagesLength);
    const quantityOfMessages = useSelector(selectCurrentRoomQuantityOfMessages);

    const [page, setPage] = useState(0);
    const [size] = useState(100000);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [lockScrollPosition, setLockScrollPosition] = useState(false);
    const [currentScrollTopValue, setCurrentScrollTopValue] = useState(null);
    const [prevScrollTopValue, setPrevScrollTopValue] = useState(null);
    const [clientHeight, setClientHeight] = useState(null);

    const scrollToBottom = useCallback(
        rowIndex => {
            const { current } = listRef;
            if (current && !lockScrollPosition) {
                current.scrollToPosition(999999999999);
                setLockScrollPosition(false);
            }
        },
        [lockScrollPosition]
    );

    useEffect(
        () => scrollToBottom(currentLoadedMessagesLength),
        [currentLoadedMessagesLength, scrollToBottom]
    );

    const onGetMoreMessagesSuccess = payload => {
        const totalNumberOfAcummulatedMessages = payload.length + messages.length;
        setLockScrollPosition(Boolean(messages.length));

        if (totalNumberOfAcummulatedMessages < quantityOfMessages) {
            setPage(page + 1);
            return setHasNextPage(true);
        }

        setHasNextPage(false);
    };

    const getMoreMessages = onSuccess => dispatch(getMoreMessagesAction({ page, size, onSuccess }));

    useEffect(() => getMoreMessages(onGetMoreMessagesSuccess), []);

    const onListScroll = useCallback(
        ({ scrollTop, clientHeight: cH }) => {
            if (clientHeight !== cH) {
                setClientHeight(cH);
            }
            setPrevScrollTopValue(currentScrollTopValue);
            setCurrentScrollTopValue(scrollTop);
        },
        [currentScrollTopValue]
    );

    /**
     * @todo Finalizar a função de recuperar mais mensagens de uma sala.
     *  */
    const loadMoreRows = () => {
        if (
            prevScrollTopValue &&
            currentScrollTopValue &&
            currentScrollTopValue < clientHeight &&
            prevScrollTopValue > currentScrollTopValue
        ) {
            getMoreMessages(onGetMoreMessagesSuccess);
            console.log('Load more messages!!!');
            console.log('Load more messages!!!');
            return;
        }

        console.log("Can't load more Rows");
        console.log("Can't load more Rows");
    };

    const isRowLoaded = ({ index }) => !!messages[index];

    const numberOfRows = hasNextPage ? messages.length + 1 : messages.length;

    return (
        <ChatContext.Provider
            value={{
                messages,
                quantityOfMessages,
                numberOfRows,
                listRef,
                size,
                loadMoreRows,
                isRowLoaded,
                onListScroll
            }}
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
