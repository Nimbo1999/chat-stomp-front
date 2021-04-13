import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

const RoomHeader = styled(Header)`
    background: ${({theme}) => theme.pallet.text};
`;

export { RoomHeader }
