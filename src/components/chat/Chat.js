import React from 'react';

import Message from '../message/Message';
import { ChatWrapper } from './styled.chat';

import MESSAGES from '../../mock/messages.mock';

function Chat() {
    const mensagens = MESSAGES;

    return (
        <ChatWrapper
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

export default Chat;
