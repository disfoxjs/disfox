export declare class FileManage {
    #private;
    constructor();
    readContent(path: string, options: {
        encoding?: null | undefined;
    }): Promise<{
        success: boolean;
        content: Record<string, string>;
        errorContent: import("../types/responseTypes.js").ErrorContentType;
        source: {
            title?: string;
            message?: string;
            method?: string;
            requester?: Record<string, any> | string;
            status: string | number | unknown;
        };
    }>;
}
//# sourceMappingURL=filemanage.d.ts.map