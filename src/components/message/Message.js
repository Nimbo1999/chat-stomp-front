import React from 'react';
import { Row, Col, Card, List } from 'antd';
import dayjs from 'dayjs';

import { Text, JustifyContent, CardMessage } from './styled.message';

const { Meta } = Card;

function Message({ justify = 'start', text, date }) {
    const formatDate = () => {
        const today = dayjs().format('YYYY-MM-DD');
        const getMessageDateWithoutTime = dayjs(date).format('YYYY-MM-DD');

        if (dayjs(today).isSame(dayjs(getMessageDateWithoutTime))) {
            return dayjs(date).format('[Hoje às] HH:mm');
        }

        return dayjs(date).format('DD/MM/YYYY [às] HH-mm');
    };

    const formatText = () => {
        const messageArray = String(text).split('\n');

        return messageArray.length > 1 ? (
            renderTextWithLineBreak(messageArray)
        ) : (
            <span>{messageArray[0]}</span>
        );
    };

    const renderTextWithLineBreak = messages =>
        messages.map((text, i) =>
            i === messages.length - 1 ? (
                <span>{text}</span>
            ) : (
                <>
                    <span>{text}</span>
                    <br />
                </>
            )
        );

    return (
        <List.Item>
            <Row justify={justify} style={{ width: '100%' }}>
                <Col span={20}>
                    <JustifyContent justify={justify}>
                        <CardMessage isRecipient={justify === 'start'}>
                            <Text>{formatText()}</Text>

                            <Meta
                                description={formatDate()}
                                style={{ textAlign: justify, fontSize: '.75rem' }}
                            />
                        </CardMessage>
                    </JustifyContent>
                </Col>
            </Row>
        </List.Item>
    );
}

export default Message;
