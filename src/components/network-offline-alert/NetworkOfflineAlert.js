import React, { useEffect } from 'react';
import { Alert } from 'antd';

import { Container } from './styled.network';
import { useStompClientContext } from '../../context/StompClientContext';

const NetworkOfflineAlert = () => {
    const { connected } = useStompClientContext();

    useEffect(() => console.log(connected), [connected]);

    return !connected ? (
        <Container>
            <Alert message="Network Unavailable" showIcon type="warning" />
        </Container>
    ) : null;
};

export default NetworkOfflineAlert;
