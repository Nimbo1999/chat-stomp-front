import { message } from 'antd';

class NetworkConnectionError extends Error {
    constructor(message = 'Network connection error!') {
        super(message);
        this.name = NetworkConnectionError.name;
    }
}

function handleNetworkError(e) {
    if (e.name === NetworkConnectionError.name) {
        message.warn(e.message);
    }
}

export { NetworkConnectionError as default, handleNetworkError };
