import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout

const RoomContent = styled(Content)`
    display: flex;
    flex-direction: column;

    padding: ${({theme}) => theme.spacing(2)};
`;

export { RoomContent }
