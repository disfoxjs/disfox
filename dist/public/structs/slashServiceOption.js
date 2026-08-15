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
var _SlashOption_name, _SlashOption_description, _SlashOption_type, _SlashOption_required, _SlashOption_settings;
/**
 * Represents an input option for a Discord slash command.
 * Allows for fluent configuration of input types, descriptions, requirements,
 * and specific numerical constraints.
 */
export class SlashOption {
    /**
     * Creates an instance of a SlashOption.
     * @param {string} name - The internal name of the option.
     */
    constructor(name) {
        _SlashOption_name.set(this, void 0);
        _SlashOption_description.set(this, void 0);
        _SlashOption_type.set(this, void 0);
        _SlashOption_required.set(this, void 0);
        _SlashOption_settings.set(this, void 0);
        __classPrivateFieldSet(this, _SlashOption_name, name, "f");
        __classPrivateFieldSet(this, _SlashOption_type, null, "f");
        __classPrivateFieldSet(this, _SlashOption_description, null, "f");
        __classPrivateFieldSet(this, _SlashOption_required, false, "f");
        __classPrivateFieldSet(this, _SlashOption_settings, {}, "f");
    }
    /**
     * Sets the data type of the option.
     * @param {SlashOptions[keyof SlashOptions]} type - The type defined in the SlashOptions enum.
     * @returns {this} The current SlashOption instance for chaining.
     */
    type(type) {
        __classPrivateFieldSet(this, _SlashOption_type, type, "f");
        return this;
    }
    /**
     * Sets the description of the option as it appears in the Discord UI.
     * @param {string} description - The description text.
     * @returns {this} The current SlashOption instance for chaining.
     */
    description(description) {
        __classPrivateFieldSet(this, _SlashOption_description, description, "f");
        return this;
    }
    /**
     * Defines whether this option is mandatory for the user to provide.
     * @param {boolean} isRequired - True if mandatory, false otherwise.
     * @returns {this} The current SlashOption instance for chaining.
     */
    required(isRequired) {
        __classPrivateFieldSet(this, _SlashOption_required, isRequired, "f");
        return this;
    }
    /**
     * Sets the maximum allowed value if the option is a number type.
     * @param {number} number - The maximum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    maxNumber(number) {
        __classPrivateFieldGet(this, _SlashOption_settings, "f").maxNumber = number;
        return this;
    }
    /**
     * Sets the minimum allowed value if the option is a number type.
     * @param {number} number - The minimum value limit.
     * @returns {this} The current SlashOption instance for chaining.
     */
    minNumber(number) {
        __classPrivateFieldGet(this, _SlashOption_settings, "f").minNumber = number;
        return this;
    }
    /**
     * Retrieves the internal configuration object for this option.
     * @returns {Object} An object containing all configured option properties.
     */
    get data() {
        return {
            name: __classPrivateFieldGet(this, _SlashOption_name, "f"),
            type: __classPrivateFieldGet(this, _SlashOption_type, "f"),
            description: __classPrivateFieldGet(this, _SlashOption_description, "f"),
            required: __classPrivateFieldGet(this, _SlashOption_required, "f"),
            settings: __classPrivateFieldGet(this, _SlashOption_settings, "f")
        };
    }
    get isRequired() {
        return __classPrivateFieldGet(this, _SlashOption_required, "f");
    }
}
_SlashOption_name = new WeakMap(), _SlashOption_description = new WeakMap(), _SlashOption_type = new WeakMap(), _SlashOption_required = new WeakMap(), _SlashOption_settings = new WeakMap();
