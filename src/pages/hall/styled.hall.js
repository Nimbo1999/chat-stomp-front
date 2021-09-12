import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

const ChatWrapper = styled(Layout)`
    height: '100%';
`;

const ChatSider = styled(Sider)`
    background: ${({theme}) => theme.pallet.white};
`;

const ItemWrapper = styled.div`
    cursor: pointer;
`;

export { ChatWrapper, ChatSider, ItemWrapper };
