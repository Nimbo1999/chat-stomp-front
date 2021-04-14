import styled, { css } from 'styled-components';
import { Typography, Card } from 'antd';

const { Paragraph } = Typography;

const Text = styled(Paragraph)`
    text-align: ${({justify}) => justify};
    width: fit-content;
`;

const CardMessage = styled(Card)`
    width: fit-content;

    ${({isRecipient}) => isRecipient && css`
        background: ${({theme}) => theme.pallet.lightBlue};
        border: 1px solid ${({theme}) => theme.pallet.blue};
    `}
`;

const JustifyContent = styled.div`
    display: flex;
    justify-content: ${({justify}) => `flex-${justify}`};
`;

export { Text, JustifyContent, CardMessage }