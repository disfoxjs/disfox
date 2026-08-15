'strict mode';
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
var _Command_name, _Command_description, _Command_contexts, _Command_options, _Command_tags, _Command_execute;
import { SlashInput } from "../../../../../new/public/core/builders/structures/slashinput.js";
import { DisfoxError } from "../../../../../new/internal/errors/_disfoxerror.js";
import { DisfoxErrorCode } from "../../../../../new/internal/errors/_disfox.errorCode.js";
import { SlashTag } from '../../../../../new/public/types/slashTag.js';
export class Command {
    constructor(name) {
        _Command_name.set(this, void 0);
        _Command_description.set(this, void 0);
        _Command_contexts.set(this, void 0);
        _Command_options.set(this, void 0);
        _Command_tags.set(this, void 0);
        _Command_execute.set(this, void 0);
        this.data = () => {
            return {
                name: __classPrivateFieldGet(this, _Command_name, "f"),
                description: __classPrivateFieldGet(this, _Command_description, "f"),
                contexts: __classPrivateFieldGet(this, _Command_contexts, "f"),
                options: __classPrivateFieldGet(this, _Command_options, "f"),
                tags: __classPrivateFieldGet(this, _Command_tags, "f"),
                action: __classPrivateFieldGet(this, _Command_execute, "f")
            };
        };
        __classPrivateFieldSet(this, _Command_name, name, "f");
        __classPrivateFieldSet(this, _Command_description, null, "f");
        __classPrivateFieldSet(this, _Command_options, [], "f");
        __classPrivateFieldSet(this, _Command_contexts, [], "f");
        __classPrivateFieldSet(this, _Command_tags, [], "f");
        __classPrivateFieldSet(this, _Command_execute, () => { }, "f");
    }
    ;
    description(description) {
        __classPrivateFieldSet(this, _Command_description, description, "f");
        return this;
    }
    ;
    option(option) {
        if (!(option instanceof SlashInput)) {
            throw new DisfoxError({
                code: DisfoxErrorCode.INVALID_TYPE,
                message: "Invalid option provided: expected an instance of SlashInput.",
                details: {
                    method: ".option()",
                    received: option
                }
            });
        }
        ;
        __classPrivateFieldGet(this, _Command_options, "f").push(option);
        return this;
    }
    ;
    mark(tag) {
        if (!Object.values(SlashTag).includes(tag)) {
            throw new DisfoxError({
                "code": DisfoxErrorCode.INVALID_TYPE,
                "message": "Invalid tag provided: the value must be a valid member of the SlashTag enum.",
                "details": { "method": ".mark()", "received": tag }
            });
        }
        if (__classPrivateFieldGet(this, _Command_tags, "f").includes(tag)) {
            throw new DisfoxError({
                "code": DisfoxErrorCode.DUPLICATE_TAG,
                "message": `The tag "${tag}" has already been defined for this command and cannot be registered again.`,
                "details": { "method": ".mark()", "received": tag }
            });
        }
        __classPrivateFieldGet(this, _Command_tags, "f").push(tag);
        return this;
    }
    ;
    action(callback) {
        __classPrivateFieldSet(this, _Command_execute, callback, "f");
        return this;
    }
    ;
}
_Command_name = new WeakMap(), _Command_description = new WeakMap(), _Command_contexts = new WeakMap(), _Command_options = new WeakMap(), _Command_tags = new WeakMap(), _Command_execute = new WeakMap();
;
