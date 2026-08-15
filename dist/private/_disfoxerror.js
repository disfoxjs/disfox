export class DisfoxError extends Error {
    constructor({ code, source, message, details }) {
        super(message);
        this.code = code;
        this.source = source;
        this.details = details;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DisfoxError);
        }
    }
}
