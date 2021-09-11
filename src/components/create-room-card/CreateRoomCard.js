import React from 'react';
import {useSelector, useDispatch, batch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES_CONSTANTS from '../../pages/routes.constants';

import createNewRoomAction from '../../redux/channel/createRoom.action';
import {
    selectContacts, selectIsShowingNewRoomSection, setShowNewRoomSection, setSelectedRoomUser,
    selectedRoomUser, isLoading
} from '../../redux/channel/channel.reducer';

import { Card, Select, Button, message } from 'antd';

const { Option } = Select;

function CreateRoomCard() {
    const history = useHistory();
    const dispatch = useDispatch();

    const contacts = useSelector(selectContacts);
    const loading = useSelector(isLoading);
    const selectedCardUser = useSelector(selectedRoomUser);
    const isVisible = useSelector(selectIsShowingNewRoomSection);

    function onSelectNewRecipient(token) {
        const selectedUser = contacts.find(item => item.token === token);
        dispatch(setSelectedRoomUser(selectedUser));
    }

    function onCancel() {
        batch(() => {
            dispatch(setShowNewRoomSection(false));
            dispatch(setSelectedRoomUser({ token: '' }));
        });
    }

    function onCreateNewRoom() {
        dispatch(createNewRoomAction((roomToken) => {
            message.success('Sala criada com sucesso!');
            history.push(`${ROUTES_CONSTANTS.CHAT}${ROUTES_CONSTANTS.URL_PARAM(roomToken)}`);
        }));
    }

    if (isVisible) return (
        <Card
            title="Selecione o usuário"
            size="small"
            actions={[
                <Button
                    key="cancel-button"
                    type="link"
                    onClick={onCancel}
                    htmlType="button"
                >
                    Cancelar
                </Button>,
                <Button
                    key="create-button"
                    type="link"
                    onClick={onCreateNewRoom}
                    htmlType="button"
                    loading={loading}
                    disabled={ loading || !selectedCardUser.token }
                >
                    Confirmar
                </Button>,
            ]}
        >
            <Select
                showSearch
                placeholder="Buscar..."
                optionFilterProp="children"
                onChange={onSelectNewRecipient}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{
                    width: '100%',
                }}
                value={selectedCardUser.token}
            >
                {contacts.map(contact => (
                    <Option value={contact.token} key={contact.token}>{contact.name}</Option>
                ))}
            </Select>
        </Card>
    );

    return null;
}

export default CreateRoomCard;
