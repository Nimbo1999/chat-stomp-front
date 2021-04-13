import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

const ChatWrapper = styled(Layout)`
    height: '100%';
`;

const ChatSider = styled(Sider)`
    background: ${({theme}) => theme.pallet.white};
`;

export { ChatWrapper, ChatSider };
