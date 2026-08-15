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
var _Message_embeds, _Message_content, _Message_components, _Message_flags;
import { Embed } from "discord.js";
import { DisfoxErrorCode } from "../../../new/public/errors/_disfox.errorCode.js";
import { DisfoxError } from "../../../new/public/errors/_disfoxerror.js";
export class Message {
    constructor() {
        _Message_embeds.set(this, void 0);
        _Message_content.set(this, void 0);
        _Message_components.set(this, void 0);
        _Message_flags.set(this, void 0);
        __classPrivateFieldSet(this, _Message_embeds, [], "f");
        __classPrivateFieldSet(this, _Message_content, null, "f");
        __classPrivateFieldSet(this, _Message_flags, null, "f");
        __classPrivateFieldSet(this, _Message_components, [], "f");
    }
    /**
     * embeds
     */
    embeds(embeds) {
        for (const embed of embeds) {
            if (!(embed instanceof Embed)) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.INVALID_TYPE,
                    "message": `Expected an instance of Embed, received: ${embed}`,
                    "source": {
                        body: { "method": "Message.embeds()" }
                    }
                });
            }
            __classPrivateFieldGet(this, _Message_embeds, "f").push(embed);
        }
        return this;
    }
    content(content) {
        if (typeof content !== 'string') {
            throw new DisfoxError({
                "code": DisfoxErrorCode.INVALID_TYPE,
                "message": `Expected string. received: ${content}`,
                "source": {
                    body: { "method": "Message.content()" }
                }
            });
        }
    }
    flags(flags) {
        if (typeof flags !== 'number') {
            throw new DisfoxError({
                "code": DisfoxErrorCode.INVALID_TYPE,
                "message": `Expected number. received: ${flags}`,
                "source": {
                    body: { "method": "Message.flags()" }
                }
            });
        }
    }
}
_Message_embeds = new WeakMap(), _Message_content = new WeakMap(), _Message_components = new WeakMap(), _Message_flags = new WeakMap();
