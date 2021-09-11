import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { List, Avatar, Typography, Button, Row, Col, Alert } from 'antd';
import {MessageTwoTone} from '@ant-design/icons';

import { closeError, setShowNewRoomSection, setCurrentRoom } from '../../redux/channel/channel.reducer';
import {
    selectError, selectCurrentRoom, selectAvailableRooms
} from '../../redux/channel/channel.selector';

import {AppRoute} from '../routes';
import ROUTES_CONSTANTS from '../routes.constants'

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import CreateRoomCard from '../../components/create-room-card/CreateRoomCard';

import { withStompClient } from '../../context/StompClient';

import { ChatWrapper, ChatSider, ItemWrapper } from './styled.chat';
import { useTheme } from 'styled-components';

const {Title} = Typography;

function ChatPage({ history }) {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const availableRooms = useSelector(selectAvailableRooms);
    const currentRoom = useSelector(selectCurrentRoom);
    const theme = useTheme();

    function onSelectRoom(token) {
        dispatch(setCurrentRoom({ token }));
        history.push(`${ROUTES_CONSTANTS.CHAT}${ROUTES_CONSTANTS.URL_PARAM(token)}`);
    }

    function showCreationRoomCard() {
        dispatch(setShowNewRoomSection(true));
    }

    return (
        <ChatWrapper style={{height: '100%'}}>
            <ChatSider style={{ background: '#fff' }} width={300}>
                <List
                    style={{ padding: '16px 24px' }}
                    header={<Title level={3}>Contatos</Title>}
                    dataSource={availableRooms}
                    renderItem={item => (
                        <ItemWrapper key={item} onClick={() => onSelectRoom(item)}>
                            <List.Item style={{
                                background: currentRoom && currentRoom.token === item
                                    ? theme.pallet.lightBlue
                                    : theme.pallet.white
                            }}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={<MessageTwoTone />}
                                            style={{
                                                backgroundColor: 'transparent',
                                            }}
                                        />
                                    }
                                    title={item}
                                />
                            </List.Item>
                        </ItemWrapper>
                    )}
                    footer={(
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <Button type="primary" htmlType="button" block onClick={showCreationRoomCard}>
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
                    )}
                >
                </List>
            </ChatSider>

            <Switch>
                <AppRoute path={ROUTES_CONSTANTS.CHAT + ROUTES_CONSTANTS.ROOM} component={RoomPage} />

                <AppRoute path={ROUTES_CONSTANTS.CHAT} exact component={EmptyPage} />
            </Switch>

        </ChatWrapper>
    );
}

export default withStompClient(ChatPage);
