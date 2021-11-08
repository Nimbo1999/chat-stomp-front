import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectCurrentRoomMessages,
    selectCurrentRoomQuantityOfMessages
    // selectMessagesCont
} from '../redux/channel/channel.selector';
import getMoreMessagesAction from '../redux/channel/getMoreMessages.action';

const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const listRef = useRef(null);

    const currentRoomMessages = useSelector(selectCurrentRoomMessages);
    // const messagesCount = useSelector(selectMessagesCont);
    const quantityOfMessages = useSelector(selectCurrentRoomQuantityOfMessages);

    const [hasNextPage, setHasNextPage] = useState(false);
    const [currentScrollTopValue, setCurrentScrollTopValue] = useState(null);
    const [prevScrollTopValue, setPrevScrollTopValue] = useState(null);
    const [clientHeight, setClientHeight] = useState(null);
    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);

    const messages = [...currentRoomMessages];

    // const scrollToBottom = useCallback(
    //     currentLoadedMessagesLength => {
    //         const { current } = listRef;

    //         try {
    //             if (quantityOfMessages) {
    //                 current.recomputeRowHeights();
    //             }

    //             if (!lockScrollPosition) {
    //                 current.scrollToRow(currentLoadedMessagesLength - 1);
    //                 setLockScrollPosition(false);
    //             }
    //         } catch (err) {
    //             if (process && process.env.NODE_ENV === 'development') {
    //                 console.log('Unabled to call listRef.current!!');
    //                 console.log(err);
    //             }
    //         }
    //     },
    //     [lockScrollPosition]
    // );

    // useEffect(() => scrollToBottom(messagesCount), [messagesCount, scrollToBottom]);

    const onGetMoreMessagesSuccess = payload => {
        const { cursorMark } = payload;
        setIsLoadingMoreMessages(false);

        if (cursorMark) {
            return setHasNextPage(true);
        }

        setHasNextPage(false);
    };

    const getMoreMessages = onSuccess => {
        setIsLoadingMoreMessages(true);
        dispatch(getMoreMessagesAction(onSuccess));
    };

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
        if (isLoadingMoreMessages) return;

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
                messages: [...messages].reverse(),
                quantityOfMessages,
                numberOfRows,
                listRef,
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
