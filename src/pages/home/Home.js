import React from 'react';
import { Card, Select, Typography, Button, Space, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {selectUserName, setName} from '../../redux/user/userSlice';

import ROUTES_CONSTANTS from '../routes.constants';

import { HomePageWrapper } from './styled.home';

const { Option } = Select;
const { Title } = Typography;

function HomePage({ history }) {
    const dispatch = useDispatch();

    const user = useSelector(selectUserName);

    function onChange(value) {
        dispatch(setName(value));
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log({user});
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
                            value={user}
                        >
                            <Option value="Danilo Laterra">Danilo Laterra</Option>
                            <Option value="João Gabriel">João Gabriel</Option>
                            <Option value="Matheus Lopes">Matheus Lopes</Option>
                            <Option value="Maximiliano Ferreira">Maximiliano Ferreira</Option>
                            <Option value="Rafael thomase">Rafael thomase</Option>
                            <Option value="Renan">Renan</Option>
                        </Select>

                        <Row justify="end">
                            <Col>
                                <Button
                                    type="primary"
                                    disabled={!user}
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
