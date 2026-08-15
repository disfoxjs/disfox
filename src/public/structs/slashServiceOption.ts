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
export class SlashOption {
    #name: string;
    #description: string | null;
    #type: SlashOptions[keyof SlashOptions] | null;
    #required: boolean;
    #settings: SlashInputSettings | Record<string, any>;

    /**
     * Creates an instance of a SlashOption.
     * @param {string} name - The internal name of the option.
     */
    constructor(name: string) {
        this.#name = name;
        this.#type = null;
        this.#description = null;
        this.#required = false;
        this.#settings = {};
    }

    /**
     * Sets the data type of the option.
     * @param {SlashOptions[keyof SlashOptions]} type - The type defined in the SlashOptions enum.
     * @returns {this} The current SlashOption instance for chaining.
     */
    public type(type: SlashOptions[keyof SlashOptions]): this {
        this.#type = type;
        return this;
    }

    /**
     * Sets the description of the option as it appears in the Discord UI.
     * @param {string} description - The description text.
     * @returns {this} The current SlashOption instance for chaining.
     */
    public description(description: string): this {
        this.#description = description;
        return this;
    }

    /**
     * Defines whether this option is mandatory for the user to provide.
     * @param {boolean} isRequired - True if mandatory, false otherwise.
     * @returns {this} The current SlashOption instance for chaining.
     */
    public required(isRequired: boolean): this {
        this.#required = isRequired;
        return this;
    }

    /**
     * Sets the maximum allowed value if the option is a number type.
     * @param {number} number - The maximum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    public maxNumber(number: number): this {
        this.#settings.maxNumber = number;
        return this;
    }

    /**
     * Sets the minimum allowed value if the option is a number type.
     * @param {number} number - The minimum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    public minNumber(number: number): this {
        this.#settings.minNumber = number;
        return this;
    }

    /**
     * Retrieves the internal configuration object for this option.
     * @returns {Object} An object containing all configured option properties.
     */
    public get data() {
        return {
            name: this.#name,
            type: this.#type,
            description: this.#description,
            required: this.#required,
            settings: this.#settings
        };
    }

    public get isRequired() {
        return this.#required
    }
}