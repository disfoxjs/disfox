var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PathManage_paths;
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class PathManage {
    constructor() {
        _PathManage_paths.set(this, void 0);
        __classPrivateFieldSet(this, _PathManage_paths, {}, "f");
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
        if (__classPrivateFieldGet(this, _PathManage_paths, "f").hasOwnProperty(name)) {
            throw new Error(`The path ${name} has already been defined.`);
        }
        __classPrivateFieldGet(this, _PathManage_paths, "f")[name] = path;
    }
    get(name) {
        if (!__classPrivateFieldGet(this, _PathManage_paths, "f").hasOwnProperty(name)) {
            throw new Error(`The path ${name} is not found.`);
        }
        return __classPrivateFieldGet(this, _PathManage_paths, "f")[name];
    }
    remove(name) {
        if (!__classPrivateFieldGet(this, _PathManage_paths, "f").hasOwnProperty(name)) {
            throw new Error(`The path ${name} is not found.`);
        }
        delete __classPrivateFieldGet(this, _PathManage_paths, "f")[name];
    }
}
_PathManage_paths = new WeakMap();
