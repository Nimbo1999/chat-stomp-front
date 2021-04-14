import React from 'react';
import { Row, Col, Card } from 'antd';

import { Text, JustifyContent, CardMessage } from './styled.message';
import { useTheme } from 'styled-components';

const {Meta} = Card;

function Message({ justify = 'start', text, date }) {
    const theme = useTheme();

    return (
        <Row justify={justify} style={{ width: '100%', marginBottom: theme.spacing(4) }}>
            <Col span={20}>
                <JustifyContent justify={justify}>
                    <CardMessage isRecipient={justify === 'start'}>
                        <Text justify={justify}>{text}</Text>
                        <Meta description={date.toLocaleDateString()} style={{textAlign: justify}} />
                    </CardMessage>
                </JustifyContent>
            </Col>
        </Row>
    );
}

export default Message;
