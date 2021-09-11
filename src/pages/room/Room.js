import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Layout, PageHeader, Button, Spin, message } from 'antd';

import { respondToCloseRoom, setCurrentRoom } from '../../redux/channel/channel.reducer';
import { selectCurrentRoom, isLoading } from '../../redux/channel/channel.selector';
import closeRoomAction from '../../redux/channel/closeRoom.action';
import getRoomAction from '../../redux/channel/getRoom.action';

import ROUTES_CONSTANTS from '../routes.constants';

import ChatHistory from '../../components/chat-history/ChatHistory';
import CommentaryInput from '../../components/commentary/CommentaryInput';

import { RoomContent, LoadingRoomWrapper } from './styled.room';

function RoomPage({ history, match }) {
    const { params: { token } } = match;

    const dispatch = useDispatch();

    const currentRoom = useSelector(selectCurrentRoom);
    const loading = useSelector(isLoading);

    useEffect(() => {
        dispatch(getRoomAction(token));
    }, [token, dispatch]);

    function onGoBack() {
        dispatch(setCurrentRoom(null));
        history.replace(ROUTES_CONSTANTS.CHAT);
    }

    function closeRoom() {
        batch(() => {
            dispatch(respondToCloseRoom());

            dispatch(closeRoomAction(() => {
                message.success('Bate-papo encerrado com sucesso!');
                history.replace(ROUTES_CONSTANTS.CHAT);
            }));
        });
    }

    if (currentRoom && currentRoom.recipient) return (
        <Layout>
            <PageHeader
                onBack={onGoBack}
                title={currentRoom.recipient.name}
                subTitle={currentRoom.recipient.status}
                extra={(
                    <Button
                        type="link"
                        onClick={closeRoom}
                        htmlType="button"
                        loading={loading}
                    >
                        Encerrar bate-papo
                    </Button>
                )}
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
