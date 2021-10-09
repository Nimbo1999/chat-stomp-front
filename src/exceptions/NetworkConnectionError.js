class NetworkConnectionError extends Error {
    constructor(message = 'Network connection error!') {
        super(message);
        this.name = NetworkConnectionError.name;
    }
}

export default NetworkConnectionError;
