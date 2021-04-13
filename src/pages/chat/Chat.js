import React from 'react';
import { Layout } from 'antd';

const { Sider, Header, Content } = Layout;

function ChatPage() {
    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
            </Layout>
        </Layout>
    );
}

export default ChatPage;
