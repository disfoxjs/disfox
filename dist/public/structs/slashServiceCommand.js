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
var _Command_isDFXM, _Command_name, _Command_description, _Command_contexts, _Command_options, _Command_tags, _Command_behaviorTable, _Command_execute;
import { SlashOption } from "./slashServiceOption.js";
import { SlashTag } from '../types/slashTag.js';
import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
/**
 * Represents a Discord slash command definition, allowing for fluent configuration
 * of command metadata, options, execution logic, and internal tags.
 */
export class Command {
    /**
     * Creates an instance of a Command.
     * @param {string} name - The unique name of the command (as it appears in Discord).
     */
    constructor(name) {
        _Command_isDFXM.set(this, true);
        _Command_name.set(this, void 0);
        _Command_description.set(this, void 0);
        _Command_contexts.set(this, void 0);
        _Command_options.set(this, void 0);
        _Command_tags.set(this, void 0);
        _Command_behaviorTable.set(this, void 0);
        _Command_execute.set(this, void 0);
        //super();
        __classPrivateFieldSet(this, _Command_name, name, "f");
        __classPrivateFieldSet(this, _Command_description, null, "f");
        __classPrivateFieldSet(this, _Command_options, [], "f");
        __classPrivateFieldSet(this, _Command_contexts, [], "f");
        __classPrivateFieldSet(this, _Command_tags, [], "f");
        __classPrivateFieldSet(this, _Command_execute, () => { }, "f");
    }
    /**
     * Sets the description of the command that appears in the Discord UI.
     * @param {string} description - A brief description of the command's purpose.
     * @returns {this} The current Command instance for chaining.
     */
    description(description) {
        __classPrivateFieldSet(this, _Command_description, description, "f");
        return this;
    }
    /**
     * Adds a slash command option to this command.
     * @param {SlashOption} option - An instance of SlashOption to be added.
     * @throws {DisfoxError} Throws if the provided option is not an instance of SlashOption.
     * @returns {this} The current Command instance for chaining.
     */
    option(option) {
        if (!(option instanceof SlashOption)) {
            throw new DisfoxError({
                code: DisfoxErrorCode.INVALID_TYPE,
                message: "Invalid option provided: expected an instance of SlashInput.",
                details: {
                    method: ".option()",
                    received: option
                }
            });
        }
        __classPrivateFieldGet(this, _Command_options, "f").push(option);
        return this;
    }
    /**
     * Adds a tag to the command, defining specific behaviors during registration or execution.
     * @param {SlashTag} tag - The tag value from the SlashTag enum.
     * @throws {DisfoxError} Throws if the tag is invalid or has already been defined for this command.
     * @returns {this} The current Command instance for chaining.
     */
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
    dock(component) {
        __classPrivateFieldSet(this, _Command_behaviorTable, component, "f");
        return this;
    }
    /**
     * Retrieves the internal configuration data of the command.
     * @returns {Object} An object containing the command metadata, options, tags, and action callback.
     */
    get data() {
        return {
            name: __classPrivateFieldGet(this, _Command_name, "f"),
            description: __classPrivateFieldGet(this, _Command_description, "f"),
            contexts: __classPrivateFieldGet(this, _Command_contexts, "f"),
            options: __classPrivateFieldGet(this, _Command_options, "f"),
            tags: __classPrivateFieldGet(this, _Command_tags, "f"),
            action: __classPrivateFieldGet(this, _Command_execute, "f"),
            isDFXM: __classPrivateFieldGet(this, _Command_isDFXM, "f"),
            behaviorTable: __classPrivateFieldGet(this, _Command_behaviorTable, "f")
        };
    }
    ;
    /**
     * Sets the callback function to be executed when the command is invoked.
     * @param {(interaction: Interaction) => void} callback - The function to run upon execution.
     * @returns {this} The current Command instance for chaining.
     */
    action(callback) {
        __classPrivateFieldSet(this, _Command_execute, callback, "f");
        return this;
    }
    hasBehaviorT() {
        if (!__classPrivateFieldGet(this, _Command_behaviorTable, "f"))
            return false;
        return true;
    }
}
_Command_isDFXM = new WeakMap(), _Command_name = new WeakMap(), _Command_description = new WeakMap(), _Command_contexts = new WeakMap(), _Command_options = new WeakMap(), _Command_tags = new WeakMap(), _Command_behaviorTable = new WeakMap(), _Command_execute = new WeakMap();
