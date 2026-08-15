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
var _Application_client, _Application_token;
import { ApplicationAction } from "../../../../new/public/structs/applicationAction.js";
import { EventController } from "../../../../new/public/structures/events.controller.js";
import { SlashController } from "../../../../new/public/structures/slash.controller.js";
export class Application {
    constructor(settings) {
        _Application_client.set(this, void 0);
        _Application_token.set(this, void 0);
        __classPrivateFieldSet(this, _Application_client, settings.client, "f");
        __classPrivateFieldSet(this, _Application_token, settings.token, "f");
        this.actions = new ApplicationAction(__classPrivateFieldGet(this, _Application_client, "f"), __classPrivateFieldGet(this, _Application_token, "f"));
        this.events = new EventController(__classPrivateFieldGet(this, _Application_client, "f"));
        this.slash = new SlashController(__classPrivateFieldGet(this, _Application_client, "f"));
        this.slashCommands = this.slash;
    }
    /**
     * @deprecated Use {@link client} instead.
     */
    get getClient() {
        if (!__classPrivateFieldGet(this, _Application_client, "f")) {
            throw new Error(`The client is not defined.`);
        }
        return __classPrivateFieldGet(this, _Application_client, "f");
    }
    get client() {
        if (__classPrivateFieldGet(this, _Application_client, "f") == null) {
            throw new Error(`The client is not defined.`);
        }
        else {
            return __classPrivateFieldGet(this, _Application_client, "f");
        }
    }
    get user() {
        if (__classPrivateFieldGet(this, _Application_client, "f").user == null) {
            throw new Error('The client is not logged in. User is null.');
        }
        else {
            return __classPrivateFieldGet(this, _Application_client, "f").user;
        }
    }
    /**
     * Connects the client to Discord.
     */
    async connect() {
        if (!__classPrivateFieldGet(this, _Application_token, "f")) {
            throw new Error("Token is not defined.");
        }
        await __classPrivateFieldGet(this, _Application_client, "f").login(__classPrivateFieldGet(this, _Application_token, "f"));
    }
}
_Application_client = new WeakMap(), _Application_token = new WeakMap();
