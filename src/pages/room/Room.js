import React from 'react';
// import { useSelector } from 'react-redux';
import { Layout, PageHeader, Avatar, Button } from 'antd';

// import {  } from './styled.room';

const { Content } = Layout;

function RoomPage({ history }) {

    return (
        <Layout>
            <PageHeader
                onBack={ () => history.goBack() }
                title="Title"
                subTitle="This is a subtitle"
                avatar={<Avatar />}
                extra={<Button type="link">Encerrar bate-papo</Button>}
            />
            <Content>Content</Content>
        </Layout>
    );
}

export default RoomPage;
