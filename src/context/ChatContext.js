import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentRoomMessages } from '../redux/channel/channel.selector';

const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
    const messages = useSelector(selectCurrentRoomMessages);

    const [page, setPage] = useState(0);

    const [hasNextPage, setHasNextPage] = useState(false);

    /**
     * @todo Finalizar a função de recuperar mais mensagens de uma sala.
     *  */
    const loadMoreRows = () =>
        new Promise(resolve => {
            setHasNextPage(true);
            console.log('loadMoreRows call!!');
            console.log('Get more messages callback, current on page ', page);
            setTimeout(() => resolve(), 1000);
        });

    const isRowLoaded = ({ index }) => !!messages[index];

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
