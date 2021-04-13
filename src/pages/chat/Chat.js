import React from 'react';
import { Switch } from 'react-router-dom';

import {AppRoute} from '../routes'
import ROUTES_CONSTANTS from '../routes.constants'

import RoomPage from '../room/Room';
import EmptyPage from '../empty/Empty';

import { ChatWrapper, ChatSider } from './styled.chat';

function ChatPage() {
    return (
        <ChatWrapper style={{height: '100%'}}>
            <ChatSider style={{ background: '#fff' }} width={300}>Sider</ChatSider>

            <Switch>
                <AppRoute path={ROUTES_CONSTANTS.ROOM} component={RoomPage} />

                <AppRoute path={ROUTES_CONSTANTS.CHAT} exact component={EmptyPage} />
            </Switch>

        </ChatWrapper>
    );
}

export default ChatPage;
