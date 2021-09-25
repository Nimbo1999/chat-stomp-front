import React from 'react';
import { useSelector } from 'react-redux';

import Message from '../message/Message';
import { ChatWrapper } from './styled.chat';

import { selectCurrentRoomMessages } from '../../redux/channel/channel.selector';
import { selectUserToken } from '../../redux/user/userSlice.reducer';

function Chat() {
    const messages = useSelector(selectCurrentRoomMessages);
    const userToken = useSelector(selectUserToken);

    const getMessages = () => {
        if (messages) {
            return messages;
        }

        return [];
    };

    return (
        <ChatWrapper
            dataSource={getMessages()}
            renderItem={item => (
                <Message
                    key={item.token}
                    justify={item.userToken === userToken ? 'end' : 'start'}
                    text={item.text}
                    date={item.date}
                />
            )}
            itemLayout="vertical"
        />
    );
}

export default Chat;
