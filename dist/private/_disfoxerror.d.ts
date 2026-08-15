import { DisfoxErrorCode } from "./_disfox.errorCode.js";
interface DisfoxErrorSource {
    body: any;
    requester?: string;
}
interface DisfoxErrorType {
    code: DisfoxErrorCode;
    source?: DisfoxErrorSource;
    message: string;
    details?: any;
}
export declare class DisfoxError extends Error {
    code: DisfoxErrorCode;
    source?: DisfoxErrorSource;
    details?: any;
    constructor({ code, source, message, details }: DisfoxErrorType);
}
export {};
//# sourceMappingURL=_disfoxerror.d.ts.map