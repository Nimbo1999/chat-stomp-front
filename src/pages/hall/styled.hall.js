import styled, { css } from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

const ChatWrapper = styled(Layout)`
    height: '100%';
`;

const ChatSider = styled(Sider)`
    background: ${({ theme }) => theme.pallet.strongGrey};
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;

    background-color: transparent;
    padding: ${({ theme }) => theme.spacing(1)} 0px;
    margin-bottom: ${({ theme }) => theme.spacing(1)};

    cursor: pointer;
    transition: all 200ms linear;

    &:hover {
        background-color: ${({ theme }) => theme.pallet.blue}33;
    }

    &:last-child {
        margin-bottom: 0;
    }

    .main-content {
        flex: 1;

        .title {
            color: ${({ theme }) => theme.pallet.white};
            margin-left: ${({ theme }) => theme.spacing(1)};
        }
    }

    ${({ active }) =>
        active &&
        css`
            background-color: ${({ theme }) => theme.pallet.shineBlue} !important;
        `}
`;

export { ChatWrapper, ChatSider, ItemWrapper };
