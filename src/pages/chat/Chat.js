import React from 'react';
import { Switch } from 'react-router-dom';
import { List, Avatar, Typography } from 'antd';

import {AppRoute} from '../routes'
import ROUTES_CONSTANTS from '../routes.constants'

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import { ChatWrapper, ChatSider } from './styled.chat';

const {Title} = Typography;

function ChatPage() {
    return (
        <ChatWrapper style={{height: '100%'}}>
            <ChatSider style={{ background: '#fff' }} width={300}>
                <List
                    style={{ padding: '16px 24px' }}
                    header={<Title level={3}>Contatos</Title>}
                >
                    <List.Item onClick={() => console.log('click')}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title="Teste"
                            description="Meta description"
                        />
                    </List.Item>
                </List>
            </ChatSider>

            <Switch>
                <AppRoute path={ROUTES_CONSTANTS.ROOM} component={RoomPage} />

                <AppRoute path={ROUTES_CONSTANTS.CHAT} exact component={EmptyPage} />
            </Switch>

        </ChatWrapper>
    );
}

export default ChatPage;
