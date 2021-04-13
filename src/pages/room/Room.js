import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, PageHeader, Button } from 'antd';

import { selectRoomUser, selectRoomToken } from '../../redux/room/roomSlice.reducer';
import ROUTES_CONSTANTS from '../routes.constants';

// import { HeaderTitleWrapper } from './styled.room';

const { Content } = Layout;

function RoomPage({ history }) {
    const roomToken = useSelector(selectRoomToken);
    const roomUser = useSelector(selectRoomUser);

    return (
        <Layout>
            <PageHeader
                onBack={ () => history.replace(ROUTES_CONSTANTS.CHAT) }
                title={roomUser.name}
                subTitle={roomUser.status}
                extra={<Button type="link">Encerrar bate-papo</Button>}
                style={{ background: '#ffffff' }}
            />
            <Content>Content</Content>
        </Layout>
    );
}

export default RoomPage;
