import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout

const RoomContent = styled(Content)`
    display: flex;
    flex-direction: column;

    padding: ${({theme}) => theme.spacing(2)};
`;

const LoadingRoomWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

export { RoomContent, LoadingRoomWrapper }
