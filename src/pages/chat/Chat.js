import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { List, Avatar, Typography, Button, Row, Col, Select } from 'antd';

import {selectUser} from '../../redux/user/userSlice';
import {selectContacts, setShowNewRoomSection} from '../../redux/channel/channelSlice.reducer';
import {setRoom} from '../../redux/room/roomSlice.reducer';

import {AppRoute} from '../routes';
import ROUTES_CONSTANTS from '../routes.constants'

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import CreateRoomCard from '../../components/create-room-card/CreateRoomCard';

import { ChatWrapper, ChatSider, ItemWrapper } from './styled.chat';

const {Title} = Typography;
const {Option} = Select;

function ChatPage({ history }) {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const currentUser = useSelector(selectUser);

    function onSelectContact(user) {
        const newRoom = {
            token: `${currentUser.token}${user.token}`,
            user,
        }

        dispatch(setRoom(newRoom));

        history.push(`${ROUTES_CONSTANTS.CHAT}${ROUTES_CONSTANTS.URL_PARAM(newRoom.token)}`);
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
                    dataSource={[]}
                    renderItem={item => (
                        <ItemWrapper onClick={() => onSelectContact(item)}>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={item.name}
                                    description={item.status}
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

export default ChatPage;
