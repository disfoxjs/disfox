import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * @deprecated PathManage is deprecated and is no longer supported.
 * Deprecated since Disfox v0.1.4.
 */
export class PathManage {
    #paths;
    constructor() {
        this.#paths = {};
    }
    getRoot(dir = __dirname) {
        const pkgPath = path.join(dir, 'package.json');
        if (fs.existsSync(pkgPath))
            return dir;
        const parent = path.dirname(dir);
        if (parent === dir)
            throw new Error('Root not found...');
        return this.getRoot(parent);
    }
    set(name, path) {
        if (this.#paths.hasOwnProperty(name)) {
            throw new Error(`The path ${name} has already been defined.`);
        }
        this.#paths[name] = path;
    }
    get(name) {
        if (!this.#paths.hasOwnProperty(name)) {
            throw new Error(`The path ${name} is not found.`);
        }
        return this.#paths[name];
    }
    remove(name) {
        if (!this.#paths.hasOwnProperty(name)) {
            throw new Error(`The path ${name} is not found.`);
        }
        delete this.#paths[name];
    }
}
