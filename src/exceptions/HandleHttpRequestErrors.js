import { message } from 'antd';

import BadRequestError, { handleBadRequestError } from './BadRequestError';
import InternalServerError, { handleInternalServerError } from './InternalServerError';

function handleHttpRequestErrors(err) {
    if (!err || !err.name) return;

    switch (err.name) {
        case BadRequestError.name:
            return handleBadRequestError(err);

        case InternalServerError.name:
            return handleInternalServerError(err);

        default:
            return message.error('Não foi possível executar essa operação. Default Error');
    }
}

export default handleHttpRequestErrors;
