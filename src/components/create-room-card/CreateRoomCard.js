import React from 'react';
import {useSelector, useDispatch, batch} from 'react-redux';

import {
    selectContacts, selectIsShowingNewRoomSection, setShowNewRoomSection, setSelectedRoomUser,
    selectedRoomUser
} from '../../redux/channel/channelSlice.reducer';

import { Card, Select, Button } from 'antd';

const { Option } = Select;

function CreateRoomCard() {
    const dispatch = useDispatch();

    const contacts = useSelector(selectContacts);
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

    if (isVisible) return (
        <Card
            title="Selecione o usuário"
            size="small"
            actions={[
                <Button key="cancel-button" type="link" onClick={onCancel} htmlType="button">Cancelar</Button>,
                <Button key="create-button" type="link">Confirmar</Button>,
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
