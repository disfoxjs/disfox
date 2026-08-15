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
var _AppConfig_configs;
/**
 * @deprecated
 */
export class AppConfig {
    constructor() {
        _AppConfig_configs.set(this, void 0);
        __classPrivateFieldSet(this, _AppConfig_configs, {}, "f");
    }
    set(settingName, value) {
        __classPrivateFieldGet(this, _AppConfig_configs, "f")[settingName] = value;
        return true;
    }
    get(settingName) {
        if (!__classPrivateFieldGet(this, _AppConfig_configs, "f").hasOwnProperty(settingName)) {
            throw new Error(`Setting "${settingName}" does not exist.`);
        }
        return __classPrivateFieldGet(this, _AppConfig_configs, "f")[settingName];
    }
    remove(settingName) {
        if (!__classPrivateFieldGet(this, _AppConfig_configs, "f").hasOwnProperty(settingName)) {
            throw new Error(`Setting "${settingName}" does not exist.`);
        }
        delete __classPrivateFieldGet(this, _AppConfig_configs, "f")[settingName];
        return true;
    }
}
_AppConfig_configs = new WeakMap();
