import React, { useState } from 'react';
import { Avatar, Input, Button } from 'antd';

import CommentaryWrapper from './styled.commentary';

const { TextArea } = Input;

function CommentaryInput() {
    const [text, setText] = useState();

    function handleChange({target: { value } }) {
        setText(value);
    }

    return (
        <CommentaryWrapper>

            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

            <TextArea placeholder="Mensagem..." autoSize onChange={handleChange} value={text} />

            <Button type="primary" htmlType="submit">Enviar</Button>

        </CommentaryWrapper>
    );
}

export default CommentaryInput;
