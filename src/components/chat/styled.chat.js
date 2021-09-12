import styled from 'styled-components';
import { List } from 'antd';

const ChatWrapper = styled(List)`
    flex: 1;
    overflow: hidden scroll;
    margin-bottom: ${({theme}) => theme.spacing(2)};
`;

export { ChatWrapper };
