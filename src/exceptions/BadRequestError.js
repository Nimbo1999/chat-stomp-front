import { message } from 'antd';

class BadRequestError extends Error {
    constructor(message = 'Bad request!!') {
        super(message);
        this.name = BadRequestError.name;
    }
}

function handleBadRequestError(e) {
    if (e.name === BadRequestError.name) {
        message.warn(e.message);
    }
}

export { BadRequestError as default, handleBadRequestError };
