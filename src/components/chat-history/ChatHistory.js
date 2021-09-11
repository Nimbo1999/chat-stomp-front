import React from 'react';

import Message from '../message/Message';
import { ChatHistoryWrapper } from './styled.chatHistory';

import MESSAGES from '../../mock/messages.mock';

function ChatHistory() {
    const mensagens = MESSAGES;

    return (
        <ChatHistoryWrapper
            dataSource={mensagens}
            renderItem={item => (
                <Message
                    key={item.userToken}
                    justify={item.userToken === '1' ? 'end' : 'start'}
                    text={item.text}
                    date={item.date}
                />
            )}
            itemLayout="vertical"
        />
    );
}

export default ChatHistory;
