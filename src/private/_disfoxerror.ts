import { DisfoxErrorCode } from "./_disfox.errorCode.js"

interface DisfoxErrorSource {
    body: any
    requester?: string
}

interface DisfoxErrorType {
    code: DisfoxErrorCode
    source?: DisfoxErrorSource
    message: string
    details?: any
}

export class DisfoxError extends Error {
    public code: DisfoxErrorCode
    public source?: DisfoxErrorSource
    public details?: any

   constructor({code, source, message, details}: DisfoxErrorType) {
        super(message)
        this.code = code
        this.source = source
        this.details = details

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DisfoxError)
        }
   }


}
