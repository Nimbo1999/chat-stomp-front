import React, { useState } from 'react';
import { Input, Button } from 'antd';

import CommentaryWrapper from './styled.commentary';

const { TextArea } = Input;

function CommentaryInput() {
    const [text, setText] = useState();

    function handleChange({target: { value } }) {
        setText(value);
    }

    return (
        <CommentaryWrapper>

            <TextArea placeholder="Mensagem..." autoSize onChange={handleChange} value={text} size="large" />

            <Button type="primary" htmlType="submit" size="large">Enviar</Button>

        </CommentaryWrapper>
    );
}

export default CommentaryInput;
