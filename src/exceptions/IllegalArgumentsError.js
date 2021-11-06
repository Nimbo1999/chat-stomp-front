class IllegalArgumentsError extends Error {
    constructor(message = 'Illegal Arguments!') {
        super(message);
        this.name = IllegalArgumentsError.name;
    }
}

export default IllegalArgumentsError;
