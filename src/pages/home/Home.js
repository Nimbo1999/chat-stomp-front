import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Select, Typography, Button, Space, Row, Col } from 'antd';

import ROUTES_CONSTANTS from '../routes.constants';

import { withHomePageContext, useHomePageContext } from '../../context/HomeContext';

import { HomePageWrapper } from './styled.home';

const { Option } = Select;
const { Title } = Typography;

function HomePage() {
    const {
        onSelectUser, selectedUserToken, contacts, handleSubmit, userToken
    } = useHomePageContext();

    if (userToken) {
        return <Redirect to={ ROUTES_CONSTANTS.ROOM } />
    }

    return (
        <HomePageWrapper>
            <Card style={{ width: '400px' }}>
                <form onSubmit={ handleSubmit }>
                    <Space direction="vertical" style={{ width: '100%' }} size={24}>
                        <Title level={3}>Selecione um usuário</Title>

                        <Select
                            showSearch
                            placeholder="Buscar..."
                            optionFilterProp="children"
                            onChange={ onSelectUser }
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{
                                width: '100%',
                            }}
                            value={ selectedUserToken }
                        >
                            {contacts.map(contact => (
                                <Option key={contact.token} value={contact.token}>{contact.name}</Option>
                            ))}
                        </Select>

                        <Row justify="end">
                            <Col>
                                <Button
                                    type="primary"
                                    disabled={ !selectedUserToken }
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

export default withHomePageContext(HomePage);
