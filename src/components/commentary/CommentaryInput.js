import React from 'react';
import { Input, Button, Alert } from 'antd';

import { CommentaryWrapper, Container } from './styled.commentary';
import { useRoomContext } from '../../context/RoomContext';

const { TextArea } = Input;

function CommentaryInput() {

    const { onSubmitMessage, handleOnChangeMessage, textMessage, error } = useRoomContext();

    return (
        <Container>

            {error && (
                <Alert message={ error } type="error" />
            )}

            <CommentaryWrapper onSubmit={ onSubmitMessage }>

                <TextArea
                    placeholder="Mensagem..."
                    size="large"
                    onChange={ handleOnChangeMessage }
                    value={ textMessage }
                    autoSize
                />

                <Button type="primary" htmlType="submit" size="large">
                    Enviar
                </Button>

            </CommentaryWrapper>
        </Container>
    );
}

export default CommentaryInput;
