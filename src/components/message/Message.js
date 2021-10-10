import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, List } from 'antd';
import { ClockCircleFilled, CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { selectUser } from '../../redux/user/userSlice.reducer';

import { MESSAGE_STATUS } from '../../constants/messageStatus';

import { Text, JustifyContent, CardMessage, MetaWrapper } from './styled.message';

const Message = ({ message, style }) => {
    const userToken = useSelector(selectUser);

    const justify = message && message.userToken === userToken ? 'end' : 'start';

    const formatDate = () => {
        if (!message) return '';

        const today = dayjs().format('YYYY-MM-DD');
        const getMessageDateWithoutTime = dayjs(message.date).format('YYYY-MM-DD');

        if (dayjs(today).isSame(dayjs(getMessageDateWithoutTime))) {
            return dayjs(message.date).format('[Hoje às] HH:mm');
        }

        return dayjs(message.date).format('DD/MM/YYYY [às] HH-mm');
    };

    const formatText = () => {
        if (!message) return '';

        const messageArray = String(message.text).split('\n');

        return messageArray.length > 1 ? (
            renderTextWithLineBreak(messageArray)
        ) : (
            <span>{messageArray[0]}</span>
        );
    };

    const renderTextWithLineBreak = messages =>
        messages.map((text, i) =>
            i === messages.length - 1 ? (
                <span key={text.concat(i)}>{text}</span>
            ) : (
                <div key={text.concat(i)}>
                    <span>{text}</span>
                    <br />
                </div>
            )
        );

    const renderIcon = () =>
        message && message.status === MESSAGE_STATUS.NOT_SENDED ? (
            <ClockCircleFilled />
        ) : (
            <CheckOutlined />
        );

    return (
        <List.Item style={style}>
            <Row justify={justify} style={{ width: '100%' }}>
                <Col span={20}>
                    <JustifyContent justify={justify}>
                        <CardMessage isRecipient={justify === 'start'}>
                            <Text>{formatText()}</Text>

                            <MetaWrapper justify={justify}>
                                {justify === 'start' ? (
                                    <>
                                        {renderIcon()}
                                        <span>{formatDate()}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{formatDate()}</span>
                                        {renderIcon()}
                                    </>
                                )}
                            </MetaWrapper>
                        </CardMessage>
                    </JustifyContent>
                </Col>
            </Row>
        </List.Item>
    );
};

export default Message;
