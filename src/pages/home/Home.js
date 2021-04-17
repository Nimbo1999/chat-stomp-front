import React from 'react';
import { Card, Select, Typography, Button, Space, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {selectUserName, setName} from '../../redux/user/userSlice';
import {selectContacts, setContacts} from '../../redux/channel/channelSlice.reducer';

import ROUTES_CONSTANTS from '../routes.constants';

import { HomePageWrapper } from './styled.home';

const { Option } = Select;
const { Title } = Typography;

function HomePage({ history }) {
    const dispatch = useDispatch();

    const userName = useSelector(selectUserName);
    const contacts = useSelector(selectContacts);

    function onChange(value) {
        const contact = contacts.find(item => item.token === value);
        dispatch(setName(contact));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newContacts = contacts.filter(item => item.name !== userName);
        dispatch(setContacts(newContacts))

        history.push(ROUTES_CONSTANTS.CHAT);
    }

    return (
        <HomePageWrapper>
            <Card style={{ width: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <Space direction="vertical" style={{ width: '100%' }} size={24}>
                        <Title level={3}>Selecione um usuário</Title>

                        <Select
                            showSearch
                            placeholder="Buscar..."
                            optionFilterProp="children"
                            onChange={onChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{
                                width: '100%',
                            }}
                            value={userName}
                        >
                            {contacts.map(contact => (
                                <Option value={contact.token}>{contact.name}</Option>
                            ))}
                        </Select>

                        <Row justify="end">
                            <Col>
                                <Button
                                    type="primary"
                                    disabled={!userName}
                                    htmlType="submit"
                                >
                                    Confirmar
                                </Button>
                            </Col>
                        </Row>
                    </Space>
                </form>
            </Card>
        </HomePageWrapper>
    )
}

export default HomePage;
