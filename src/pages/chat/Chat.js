import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { List, Avatar, Typography } from 'antd';

import {selectUser} from '../../redux/user/userSlice';
import {selectContacts} from '../../redux/contacts/contactsSlice';
import {setRoom} from '../../redux/room/roomSlice.reducer';

import {AppRoute} from '../routes'
import ROUTES_CONSTANTS from '../routes.constants'

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import { ChatWrapper, ChatSider } from './styled.chat';

const {Title} = Typography;

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

    return (
        <ChatWrapper style={{height: '100%'}}>
            <ChatSider style={{ background: '#fff' }} width={300}>
                <List
                    style={{ padding: '16px 24px' }}
                    header={<Title level={3}>Contatos</Title>}
                    dataSource={contacts}
                    renderItem={item => (
                        <div onClick={() => onSelectContact(item)}>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={item.name}
                                    description={item.status}
                                />
                            </List.Item>
                        </div>
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
