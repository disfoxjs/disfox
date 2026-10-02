import { ErrorContentType } from "../types/responseTypes.js";
/**
 * @deprecated Response is deprecated and is no longer supported.
 * Deprecated since Disfox v0.1.4.
 */
declare class Response {
    #private;
    constructor(source?: any);
    success(content: {}): this;
    error(content: ErrorContentType): this;
    get result(): {
        success: boolean;
        content: Record<string, string>;
        errorContent: ErrorContentType;
        source: {
            title?: string;
            message?: string;
            method?: string;
            requester?: Record<string, any> | string;
            status: string | number | unknown;
        };
    };
}
export { Response };
//# sourceMappingURL=response.d.ts.map