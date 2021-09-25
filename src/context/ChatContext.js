import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentRoomMessages } from '../redux/channel/channel.selector';

const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
    const messages = useSelector(selectCurrentRoomMessages);

    const [page, setPage] = useState(0);

    const [hasNextPage, setHasNextPage] = useState(false);
    const [isNextPageLoading, setIsNextPageLoading] = useState(false);

    const loadMoreRows = () => {
        if (isNextPageLoading) return;

        // TODO: get more messages
        console.log('Get more messages callback, current on page ', page);
    };

    const isRowLoaded = ({ index }) => !hasNextPage || index < messages.length;

    const numberOfRows = hasNextPage ? messages.length + 1 : messages.length;

    return (
        <ChatContext.Provider value={{ messages, numberOfRows, loadMoreRows, isRowLoaded }}>
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
