import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { InfiniteLoader, List } from 'react-virtualized';

import Message from '../message/Message';

import { withChatContext, useChatContext } from '../../context/ChatContext';

import { selectUserToken } from '../../redux/user/userSlice.reducer';

import { ChatWrapper } from './styled.chat';

function Chat() {
    const { messages, numberOfRows, loadMoreRows, isRowLoaded } = useChatContext();

    const userToken = useSelector(selectUserToken);

    const chatWrapperRef = useRef(null);

    // Finalizar a construção da lista virtualizada.
    // Entender as props que estão posicionadas estáticamente
    return (
        <ChatWrapper ref={chatWrapperRef}>
            <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows}>
                {({ onRowsRendered, registerChild }) => (
                    <List
                        height={400}
                        width={400}
                        ref={registerChild}
                        rowCount={numberOfRows}
                        onRowsRendered={onRowsRendered}
                        rowHeight={80}
                        rowRenderer={({ index }) => (
                            <Message
                                key={messages[index].token}
                                justify={messages[index].userToken === userToken ? 'end' : 'start'}
                                text={messages[index].text}
                                date={messages[index].date}
                            />
                        )}
                    />
                )}
            </InfiniteLoader>
        </ChatWrapper>
    );
}

export default withChatContext(Chat);
