import styled, { css } from 'styled-components';
import { Typography, Card } from 'antd';

const { Paragraph } = Typography;

const Text = styled(Paragraph)`
    text-align: ${({ justify }) => justify};
    width: fit-content;
    margin-bottom: 0.25em !important;

    span {
        line-height: 0.875rem;
        color: ${({ theme }) => theme.pallet.text};
    }
`;

const CardMessage = styled(Card)`
    width: fit-content;

    & > div {
        padding: ${({ theme }) => theme.spacing(2)};
    }

    ${({ isRecipient }) =>
        isRecipient &&
        css`
            background: ${({ theme }) => theme.pallet.lightBlue};
            border: 1px solid ${({ theme }) => theme.pallet.blue};
        `}
`;

const JustifyContent = styled.div`
    display: flex;
    justify-content: ${({ justify }) => `flex-${justify}`};
`;

export { Text, JustifyContent, CardMessage };
