import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { List, Avatar, Typography, Button, Row, Col, Alert, Badge } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';
import { useTheme } from 'styled-components';

import {
    closeError,
    setShowNewRoomSection,
    removeBadges
} from '../../redux/channel/channel.reducer';
import {
    selectError,
    selectCurrentRoom,
    selectAvailableRooms
} from '../../redux/channel/channel.selector';
import { selectUser } from '../../redux/user/userSlice.reducer';

import { AppRoute } from '../routes';
import ROUTES_CONSTANTS from '../routes.constants';

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import CreateRoomCard from '../../components/create-room-card/CreateRoomCard';
import NetworkOfflineAlert from '../../components/network-offline-alert/NetworkOfflineAlert';

import { useStompClientContext, withStompClientContext } from '../../context/StompClientContext';
import { withHallContext } from '../../context/HallContext';

import { handleNetworkError } from '../../exceptions/NetworkConnectionError';

import { ChatWrapper, ChatSider, ItemWrapper } from './styled.hall';

const { Title } = Typography;

function HallPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();

    const { verifyIfHasConnection } = useStompClientContext();

    const error = useSelector(selectError);
    const availableRooms = useSelector(selectAvailableRooms);
    const currentRoom = useSelector(selectCurrentRoom);
    const user = useSelector(selectUser);

    function onSelectRoom(id) {
        try {
            verifyIfHasConnection();
            dispatch(removeBadges(id));
            history.push(ROUTES_CONSTANTS.ROOM + ROUTES_CONSTANTS.URL_PARAM(id));
        } catch (e) {
            handleNetworkError(e);
        }
    }

    function showCreationRoomCard() {
        try {
            verifyIfHasConnection();
            dispatch(setShowNewRoomSection(true));
        } catch (e) {
            handleNetworkError(e);
        }
    }

    function getRoomTitle(sender, recipient) {
        if (!sender || !recipient) return '';

        if (sender.token === user.token) {
            return recipient.name;
        }

        return sender.name;
    }

    return (
        <ChatWrapper style={{ height: '100%' }}>
            <NetworkOfflineAlert />

            <ChatSider width={300}>
                <List
                    style={{ padding: '16px 24px' }}
                    header={
                        <Title level={5} style={{ color: theme.pallet.white }}>
                            Bem Vindo, {user.name}
                        </Title>
                    }
                    dataSource={availableRooms}
                    renderItem={({ id, sender, recipient, badge }) => (
                        <ItemWrapper
                            key={id}
                            onClick={() => onSelectRoom(id)}
                            active={currentRoom && currentRoom.id === id}
                        >
                            <div className="main-content">
                                <Avatar
                                    icon={<MessageTwoTone />}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />

                                <span className="title">{getRoomTitle(sender, recipient)}</span>
                            </div>

                            <Badge count={badge} />
                        </ItemWrapper>
                    )}
                    footer={
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <Button
                                    type="primary"
                                    htmlType="button"
                                    block
                                    onClick={showCreationRoomCard}
                                >
                                    Criar sala
                                </Button>
                            </Col>

                            <Col span={24}>
                                <CreateRoomCard />
                            </Col>

                            <Col span={24}>
                                {error && (
                                    <Alert
                                        message={error}
                                        type="error"
                                        showIcon
                                        action={
                                            <Button
                                                size="small"
                                                danger
                                                type="link"
                                                onClick={() => {
                                                    dispatch(closeError());
                                                }}
                                            >
                                                ok
                                            </Button>
                                        }
                                    />
                                )}
                            </Col>
                        </Row>
                    }
                ></List>
            </ChatSider>

            <Switch>
                <AppRoute
                    path={ROUTES_CONSTANTS.ROOM + ROUTES_CONSTANTS.ID_PARAM}
                    component={RoomPage}
                />

                <AppRoute path={ROUTES_CONSTANTS.ROOM} exact component={EmptyPage} />
            </Switch>
        </ChatWrapper>
    );
}

export default withStompClientContext(withHallContext(HallPage));
