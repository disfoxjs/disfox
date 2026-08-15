import { SlashOptions } from "./slashOptions.js";
interface SlashInputSettings {
    minNumber?: number;
    maxNumber?: number;
}
/**
 * Represents an input option for a Discord slash command.
 * Allows for fluent configuration of input types, descriptions, requirements,
 * and specific numerical constraints.
 */
export declare class SlashOption {
    #private;
    /**
     * Creates an instance of a SlashOption.
     * @param {string} name - The internal name of the option.
     */
    constructor(name: string);
    /**
     * Sets the data type of the option.
     * @param {SlashOptions[keyof SlashOptions]} type - The type defined in the SlashOptions enum.
     * @returns {this} The current SlashOption instance for chaining.
     */
    type(type: SlashOptions[keyof SlashOptions]): this;
    /**
     * Sets the description of the option as it appears in the Discord UI.
     * @param {string} description - The description text.
     * @returns {this} The current SlashOption instance for chaining.
     */
    description(description: string): this;
    /**
     * Defines whether this option is mandatory for the user to provide.
     * @param {boolean} isRequired - True if mandatory, false otherwise.
     * @returns {this} The current SlashOption instance for chaining.
     */
    required(isRequired: boolean): this;
    /**
     * Sets the maximum allowed value if the option is a number type.
     * @param {number} number - The maximum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    maxNumber(number: number): this;
    /**
     * Sets the minimum allowed value if the option is a number type.
     * @param {number} number - The minimum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    minNumber(number: number): this;
    /**
     * Retrieves the internal configuration object for this option.
     * @returns {Object} An object containing all configured option properties.
     */
    get data(): {
        name: string;
        type: typeof import("discord.js").SlashCommandStringOption | typeof import("discord.js").SlashCommandNumberOption | typeof import("discord.js").SlashCommandChannelOption | typeof import("discord.js").SlashCommandBooleanOption | typeof import("discord.js").SlashCommandRoleOption | typeof import("discord.js").SlashCommandAttachmentOption | typeof import("discord.js").SlashCommandMentionableOption | null;
        description: string | null;
        required: boolean;
        settings: SlashInputSettings | Record<string, any>;
    };
    get isRequired(): boolean;
}
export {};
//# sourceMappingURL=slashServiceOption.d.ts.map