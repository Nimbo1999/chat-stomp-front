import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, PageHeader, Button, Spin } from 'antd';

import { selectCurrentRoom, setCurrentRoom } from '../../redux/channel/channelSlice.reducer';
import getRoomAction from '../../redux/channel/getRoom.action';

import ROUTES_CONSTANTS from '../routes.constants';

import ChatHistory from '../../components/chat-history/ChatHistory';
import CommentaryInput from '../../components/commentary/CommentaryInput';

import { RoomContent, LoadingRoomWrapper } from './styled.room';

function RoomPage({ history, match }) {
    const {params: { token }} = match;
    const dispatch = useDispatch();

    const currentRoom = useSelector(selectCurrentRoom);

    useEffect(() => {
        dispatch(getRoomAction(token));
    }, [token, dispatch]);

    function onGoBack() {
        dispatch(setCurrentRoom(null));
        history.replace(ROUTES_CONSTANTS.CHAT);
    }

    if (currentRoom && currentRoom.recipient) return (
        <Layout>
            <PageHeader
                onBack={onGoBack}
                title={currentRoom.recipient.name}
                subTitle={currentRoom.recipient.status}
                extra={<Button type="link">Encerrar bate-papo</Button>}
                style={{ background: '#ffffff' }}
            />
            <RoomContent>
                <ChatHistory />
                <CommentaryInput />
            </RoomContent>
        </Layout>
    );

    return (
        <Layout>
            <LoadingRoomWrapper>
                <Spin size="large" />
            </LoadingRoomWrapper>
        </Layout>
    )
}

export default RoomPage;
