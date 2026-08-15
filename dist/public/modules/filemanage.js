var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _FileManage_files;
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
export class FileManage {
    constructor() {
        _FileManage_files.set(this, void 0);
        __classPrivateFieldSet(this, _FileManage_files, {}, "f");
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
_FileManage_files = new WeakMap();
