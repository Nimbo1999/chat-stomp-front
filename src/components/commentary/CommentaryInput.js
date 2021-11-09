import React, { useRef } from 'react';
import { Input, Alert, Button } from 'antd';

import { CommentaryWrapper, Container } from './styled.commentary';
import { useRoomContext } from '../../context/RoomContext';

const { TextArea } = Input;

function CommentaryInput() {
    const { onSubmitMessage, handleOnChangeMessage, textMessage, error } = useRoomContext();

    const submitButton = useRef(null);

    const specialKeyPressed = event => event.shiftKey;

    const onPressEnterInTextArea = event => {
        event.stopPropagation();
        try {
            if (specialKeyPressed(event)) return;
            return submitButton.current.click();
        } catch(err) {
            return;
        }
    };

    return (
        <Container>
            {error && <Alert message={error} type="error" />}

            <CommentaryWrapper onSubmit={onSubmitMessage}>
                <TextArea
                    placeholder="Mensagem..."
                    size="large"
                    onChange={handleOnChangeMessage}
                    value={textMessage}
                    autoSize
                    onPressEnter={onPressEnterInTextArea}
                />

                <Button type="primary" htmlType="submit" size="large" ref={submitButton}>
                    Enviar
                </Button>
            </CommentaryWrapper>
        </Container>
    );
}

export default CommentaryInput;
