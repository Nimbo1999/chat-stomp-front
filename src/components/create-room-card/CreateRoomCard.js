import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Select, Button, message } from 'antd';

import ROUTES_CONSTANTS from '../../pages/routes.constants';

import createNewRoomAction from '../../redux/channel/createRoom.action';
import {
    selectContacts,
    selectIsShowingNewRoomSection,
    selectedRoomUser,
    isLoading
} from '../../redux/channel/channel.selector';
import { setShowNewRoomSection, setSelectedRoomUser } from '../../redux/channel/channel.reducer';

import { useStompClientContext } from '../../context/StompClientContext';

import { handleNetworkError } from '../../exceptions/NetworkConnectionError';

const { Option } = Select;

function CreateRoomCard() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { verifyIfHasConnection } = useStompClientContext();

    const contacts = useSelector(selectContacts);
    const loading = useSelector(isLoading);
    const selectedCardUser = useSelector(selectedRoomUser);
    const isVisible = useSelector(selectIsShowingNewRoomSection);

    const onSelectNewRecipient = token => {
        const selectedUser = contacts.find(item => item.token === token);
        dispatch(setSelectedRoomUser(selectedUser));
    };

    const onCancel = () =>
        batch(() => {
            dispatch(setShowNewRoomSection(false));
            dispatch(setSelectedRoomUser({ id: '' }));
        });

    const onCreateNewRoom = () => {
        try {
            verifyIfHasConnection();
            dispatch(
                createNewRoomAction(({ id }) => {
                    message.success('Sala criada com sucesso!');
                    history.push(`${ROUTES_CONSTANTS.ROOM}${ROUTES_CONSTANTS.URL_PARAM(id)}`);
                })
            );
        } catch (e) {
            handleNetworkError(e);
        }
    };

    if (isVisible)
        return (
            <Card
                title="Selecione o usuário"
                size="small"
                actions={[
                    <Button key="cancel-button" type="link" onClick={onCancel} htmlType="button">
                        Cancelar
                    </Button>,
                    <Button
                        key="create-button"
                        type="link"
                        onClick={onCreateNewRoom}
                        htmlType="button"
                        loading={loading}
                        disabled={loading || !selectedCardUser.token}
                    >
                        Confirmar
                    </Button>
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
                        width: '100%'
                    }}
                    value={selectedCardUser.token}
                >
                    {contacts.map(contact => (
                        <Option value={contact.token} key={contact.token}>
                            {contact.name}
                        </Option>
                    ))}
                </Select>
            </Card>
        );

    return null;
}

export default CreateRoomCard;
