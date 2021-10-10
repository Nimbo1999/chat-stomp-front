import { message } from 'antd';

class InternalServerError extends Error {
    constructor(message = 'Internal server error!!') {
        super(message);
        this.name = InternalServerError.name;
    }
}

function handleInternalServerError(e) {
    if (e.name === InternalServerError.name) {
        message.warn(e.message);
    }
}

export { InternalServerError as default, handleInternalServerError };
