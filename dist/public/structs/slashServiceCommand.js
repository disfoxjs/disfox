import { SlashOption } from "./slashServiceOption.js";
import { SlashTag } from '../types/slashTag.js';
import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
/**
 * Represents a Discord slash command definition, allowing for fluent configuration
 * of command metadata, options, execution logic, and internal tags.
 */
export class Command {
    #isDFXM = true;
    #name;
    #description;
    #contexts;
    #options;
    #tags;
    #behaviorTable;
    #execute;
    /**
     * Creates an instance of a Command.
     * @param {string} name - The unique name of the command (as it appears in Discord).
     */
    constructor(name) {
        //super();
        this.#name = name;
        this.#description = null;
        this.#options = [];
        this.#contexts = [];
        this.#tags = [];
        this.#execute = () => { };
    }
    /**
     * Sets the description of the command that appears in the Discord UI.
     * @param {string} description - A brief description of the command's purpose.
     * @returns {this} The current Command instance for chaining.
     */
    description(description) {
        this.#description = description;
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
        this.#options.push(option);
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
        if (this.#tags.includes(tag)) {
            throw new DisfoxError({
                "code": DisfoxErrorCode.DUPLICATE_TAG,
                "message": `The tag "${tag}" has already been defined for this command and cannot be registered again.`,
                "details": { "method": ".mark()", "received": tag }
            });
        }
        this.#tags.push(tag);
        return this;
    }
    dock(component) {
        this.#behaviorTable = component;
        return this;
    }
    /**
     * Retrieves the internal configuration data of the command.
     * @returns {Object} An object containing the command metadata, options, tags, and action callback.
     */
    get data() {
        return {
            name: this.#name,
            description: this.#description,
            contexts: this.#contexts,
            options: this.#options,
            tags: this.#tags,
            action: this.#execute,
            isDFXM: this.#isDFXM,
            behaviorTable: this.#behaviorTable
        };
    }
    ;
    /**
     * Sets the callback function to be executed when the command is invoked.
     * @param {(interaction: Interaction) => void} callback - The function to run upon execution.
     * @returns {this} The current Command instance for chaining.
     */
    action(callback) {
        this.#execute = callback;
        return this;
    }
    hasBehaviorT() {
        if (!this.#behaviorTable)
            return false;
        return true;
    }
}
