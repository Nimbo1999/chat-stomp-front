import React from 'react';
import { Layout } from 'antd';

import { RoomHeader } from './styled.room';

const { Content } = Layout;

function RoomPage() {
    return (
        <Layout>
            <RoomHeader>Header</RoomHeader>
            <Content>Content</Content>
        </Layout>
    );
}

export default RoomPage;
