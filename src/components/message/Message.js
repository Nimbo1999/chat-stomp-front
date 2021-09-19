import React from 'react';
import { Row, Col, Card } from 'antd';
import dayjs from 'dayjs';

import { Text, JustifyContent, CardMessage } from './styled.message';
import { useTheme } from 'styled-components';

const { Meta } = Card;

function Message({ justify = 'start', text, date }) {
    const theme = useTheme();

    const formatDate = () => {
        const today = dayjs().format('YYYY-MM-DD');
        const getMessageDateWithoutTime = dayjs(date).format('YYYY-MM-DD');

        if (dayjs(today).isSame(dayjs(getMessageDateWithoutTime))) {
            return dayjs(date).format('[Hoje às] HH:mm');
        }

        return dayjs(date).format('DD/MM/YYYY [às] HH-mm');
    }

    const formatText = () => {
        const message = String(text).replace(/\/n/g, '<br />')

        return message;
    }

    return (
        <Row justify={ justify } style={ { width: '100%', marginBottom: theme.spacing(4) } }>
            <Col span={20}>
                <JustifyContent justify={ justify }>
                    <CardMessage isRecipient={ justify === 'start' }>
                        <Text justify={ justify }>{ formatText() }</Text>

                        <Meta
                            description={ formatDate() }
                            style={ { textAlign: justify } }
                        />
                    </CardMessage>
                </JustifyContent>
            </Col>
        </Row>
    );
}

export default Message;
