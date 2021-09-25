import styled from 'styled-components';
import { Layout, PageHeader as AntdPageHeader } from 'antd';

const { Content } = Layout;

const RoomContent = styled(Content)`
    display: flex;
    flex-direction: column;

    padding: ${({ theme }) => `0px ${theme.spacing(2)} ${theme.spacing(2)}`};
`;

const LoadingRoomWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const PageHeader = styled(AntdPageHeader)`
    background-color: ${({ theme }) => theme.pallet.text};
    box-shadow: 4px 2px 4px ${({ theme }) => theme.pallet.text}40;

    button {
        span {
            transition: all 200ms linear;
            color: ${({ theme }) => theme.pallet.white}A8;
        }

        &:hover {
            background-color: #444343;

            span {
                color: ${({ theme }) => theme.pallet.white};
            }
        }
    }

    span {
        color: ${({ theme }) => theme.pallet.white};
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;

    .main {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.pallet.white};
    }

    span {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.pallet.lightGreen};
        font-weight: 400;
        line-height: normal;
    }
`;

export { RoomContent, LoadingRoomWrapper, PageHeader, Title };
