interface ErrorContentType {
        /** Error message */
        message?: string | unknown
        /** Optional error code */
        code?: string | number
        /** Detailed reason for the error */
        reason?: string | unknown

        content?: string | unknown
}

interface ResponseType<T> {
    /** Indicates if the operation was successful */
    success: boolean

    /** Information about the response source */
    source: {
        /** Optional title of the response */
        title?: string
        /** Optional message describing the response */
        message?: string
        /** Method or route that generated the response */
        method?: string
        /** The requester of the operation */
        requester?: Record<string, any> | string
        /** Status of the operation */
        status?: string | number | unknown
    }

    /** The main content of the response */
    content: T

    /** Error information, if any */
    errorContent: ErrorContentType
}

export {ErrorContentType, ResponseType}

