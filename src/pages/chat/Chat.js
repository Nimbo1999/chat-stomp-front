import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Link } from 'react-router-dom';
import { List, Avatar, Typography } from 'antd';

import {selectContacts} from '../../redux/contacts/contactsSlice';

import {AppRoute} from '../routes'
import ROUTES_CONSTANTS from '../routes.constants'

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import { ChatWrapper, ChatSider } from './styled.chat';

const {Title} = Typography;

function ChatPage() {
    const contacts = useSelector(selectContacts);

    return (
        <ChatWrapper style={{height: '100%'}}>
            <ChatSider style={{ background: '#fff' }} width={300}>
                <List
                    style={{ padding: '16px 24px' }}
                    header={<Title level={3}>Contatos</Title>}
                    dataSource={contacts}
                    renderItem={(item) => (
                        <Link to={ `${ROUTES_CONSTANTS.CHAT}${ROUTES_CONSTANTS.URL_PARAM(item.token)}` }>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={item.name}
                                    description={item.status}
                                />
                            </List.Item>
                        </Link>
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
