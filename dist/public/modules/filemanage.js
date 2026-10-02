import fs from 'fs/promises';
import { constants } from 'fs';
import { Response } from './response.js';
async function exists(path) {
    try {
        await fs.access(path, constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * @deprecated FileManage is deprecated and is no longer supported.
 * Deprecated since Disfox v0.1.4.
 */
export class FileManage {
    #files;
    constructor() {
        this.#files = {};
    }
    async readContent(path, options) {
        const response = new Response({ path: path, options: options, method: 'FileManage.readContent()' });
        try {
            const existsFile = await exists(path);
            if (!existsFile) {
                response.error({ message: "File not found", 'content': `File not found in directory: ${path}` });
                return response.result;
            }
            const content = await fs.readFile(path, options);
            response.success(content);
            return response.result;
        }
        catch (err) {
            throw response.error({ "message": "Occurred an internal error", "content": err });
        }
    }
}
