import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Layout, Button, Spin, message } from 'antd';

import { respondToCloseRoom, setCurrentRoom } from '../../redux/channel/channel.reducer';
import { selectCurrentRoom, isLoading } from '../../redux/channel/channel.selector';
import { selectUserToken } from '../../redux/user/userSlice.reducer';
import closeRoomAction from '../../redux/channel/closeRoom.action';
import getRoomAction from '../../redux/channel/getRoom.action';

import { withRoomContext } from '../../context/RoomContext';

import ROUTES_CONSTANTS from '../routes.constants';

import Chat from '../../components/chat/Chat';
import CommentaryInput from '../../components/commentary/CommentaryInput';

import { RoomContent, LoadingRoomWrapper, PageHeader, Title } from './styled.room';

const RoomPage = () => {
    const { token } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const currentRoom = useSelector(selectCurrentRoom);
    const userToken = useSelector(selectUserToken);
    const loading = useSelector(isLoading);

    useEffect(() => {
        dispatch(getRoomAction({ roomToken: token, onSuccess: onGetRoomSuccess }));
    }, [token, dispatch]);

    const onGetRoomSuccess = room => dispatch(setCurrentRoom(room));

    const onGoBack = () => {
        dispatch(setCurrentRoom(null));

        history.replace(ROUTES_CONSTANTS.ROOM);
    };

    const closeRoom = () => {
        batch(() => {
            dispatch(respondToCloseRoom());

            dispatch(
                closeRoomAction(() => {
                    message.success('Bate-papo encerrado com sucesso!');

                    history.push(ROUTES_CONSTANTS.ROOM);
                })
            );
        });
    };

    const renderPageHeaderTitle = () => (
        <Title>
            <span className="main">{getRoomTitle()}</span>
            <span>Online</span>
        </Title>
    );

    const getRoomTitle = () => {
        if (userToken === currentRoom.sender.token) {
            return currentRoom.recipient.name;
        }

        return currentRoom.sender.name;
    };

    if (currentRoom && currentRoom.recipient)
        return (
            <Layout>
                <PageHeader
                    onBack={onGoBack}
                    title={renderPageHeaderTitle()}
                    subTitle={currentRoom.recipient.status}
                    extra={
                        <Button type="link" onClick={closeRoom} htmlType="button" loading={loading}>
                            Encerrar bate-papo
                        </Button>
                    }
                />

                <RoomContent>
                    <Chat />

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
    );
};

export default withRoomContext(RoomPage);
