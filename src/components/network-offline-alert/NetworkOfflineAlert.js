import React from 'react';
import { Alert } from 'antd';

import { Container } from './styled.network';
import { useStompClientContext } from '../../context/StompClientContext';
import { useNetworkProvider } from '../../context/NetworkConnectionContext';

const NetworkOfflineAlert = () => {
    const { isOnline } = useNetworkProvider();
    const { connected } = useStompClientContext();

    return isOnline && !connected ? (
        <Container>
            <Alert message="Unabled to reach server, try again later" showIcon type="warning" />
        </Container>
    ) : !isOnline && !connected ? (
        <Container>
            <Alert message="No internet connection, currently offline!" showIcon type="error" />
        </Container>
    ) : null;
};

export default NetworkOfflineAlert;
