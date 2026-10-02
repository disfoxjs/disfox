/**
 * Represents an input option for a Discord slash command.
 * Allows for fluent configuration of input types, descriptions, requirements,
 * and specific numerical constraints.
 */
export class SlashOption {
    #name;
    #description;
    #_type;
    #required;
    #settings;
    #_choices;
    /**
     * Creates an instance of a SlashOption.
     * @param {string} name - The internal name of the option.
     */
    constructor(name) {
        this.#name = name;
        this.#_type = null;
        this.#description = null;
        this.#required = false;
        this.#settings = {};
        this.#settings.channelT = [];
        this.#_choices = {};
    }
    /**
     * Sets the data type of the option.
     * @param {SlashOptions[keyof SlashOptions]} type - The type defined in the SlashOptions enum.
     * @returns {this} The current SlashOption instance for chaining.
     */
    type(type) {
        this.#_type = type;
        return this;
    }
    /**
     * Sets the description of the option as it appears in the Discord UI.
     * @param {string} description - The description text.
     * @returns {this} The current SlashOption instance for chaining.
     */
    description(description) {
        this.#description = description;
        return this;
    }
    /**
     * Sets the available choices for this option.
     * @param {Record<any, any>} c - A record containing the choice names and their corresponding values.
     * @returns {this} The current instance for method chaining.
     */
    choices(c) {
        this.#_choices = c;
        return this;
    }
    /**
     * Defines whether this option is mandatory for the user to provide.
     * @param {boolean} isRequired - True if mandatory, false otherwise.
     * @returns {this} The current SlashOption instance for chaining.
     */
    required(isRequired) {
        this.#required = isRequired;
        return this;
    }
    /**
     * Sets the maximum allowed value if the option is a number type.
     * @param {number} number - The maximum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    maxNumber(number) {
        this.#settings.maxNumber = number;
        return this;
    }
    /**
     * Sets the minimum allowed value if the option is a number type.
     * @param {number} number - The minimum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    minNumber(number) {
        this.#settings.minNumber = number;
        return this;
    }
    /**
     * Sets the allowed channel types for this option.
     *
     * @param {...ChannelType[]} types - The channel types that can be selected.
     * @returns {void}
     *
     * @example
     * option.channelTypes(
     *     ChannelType.GuildText,
     *     ChannelType.GuildVoice
     * );
     */
    channelTypes(...t) {
        for (const types of t)
            this.#settings.channelT.push(types);
    }
    /**
     * Retrieves the internal configuration object for this option.
     * @returns {Object} An object containing all configured option properties.
     */
    get data() {
        return {
            name: this.#name,
            type: this.#_type,
            description: this.#description,
            required: this.#required,
            settings: this.#settings,
            choices: this.#_choices
        };
    }
    get isRequired() {
        return this.#required;
    }
}
