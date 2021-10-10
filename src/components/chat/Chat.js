import React, { useEffect, useRef } from 'react';
import {
    InfiniteLoader,
    List,
    CellMeasurer,
    CellMeasurerCache,
    AutoSizer
} from 'react-virtualized';

import Message from '../message/Message';

import { withChatContext, useChatContext } from '../../context/ChatContext';

import { ChatWrapper } from './styled.chat';
import { useTheme } from 'styled-components';

function Chat() {
    const theme = useTheme();
    const cache = useRef(
        new CellMeasurerCache({
            fixedWidth: true
        })
    );

    const {
        messages,
        quantityOfMessages,
        numberOfRows,
        listRef,
        loadMoreRows,
        isRowLoaded,
        onListScroll,
        size
    } = useChatContext();

    useEffect(() => {
        const { current } = listRef;

        if (current && messages.length) {
            current.scrollToRow(numberOfRows);
        }
    }, [listRef.current]);

    return (
        <ChatWrapper>
            <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={quantityOfMessages}
                minimumBatchSize={size}
                threshold={size}
            >
                {({ onRowsRendered, registerChild }) => {
                    registerChild(listRef);

                    return (
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    ref={listRef}
                                    rowCount={numberOfRows}
                                    onRowsRendered={onRowsRendered}
                                    rowHeight={cache.current.rowHeight}
                                    deferredMeasurementCache={cache.current}
                                    style={{ padding: `0px ${theme.spacing(2)}` }}
                                    scrollToAlignment="end"
                                    onScroll={onListScroll}
                                    rowRenderer={({ index, parent, key, style }) =>
                                        messages[index] ? (
                                            <CellMeasurer
                                                cache={cache.current}
                                                parent={parent}
                                                columnIndex={0}
                                                key={key}
                                                rowIndex={index}
                                            >
                                                <Message message={messages[index]} style={style} />
                                            </CellMeasurer>
                                        ) : null
                                    }
                                    height={height}
                                    width={width}
                                />
                            )}
                        </AutoSizer>
                    );
                }}
            </InfiniteLoader>
        </ChatWrapper>
    );
}

export default withChatContext(Chat);
