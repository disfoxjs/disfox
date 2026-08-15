import { ChatInputCommandInteraction, CommandInteraction, InteractionContextType } from "discord.js";
import { SlashOption } from "./slashServiceOption.js";
import { SlashTag } from '../types/slashTag.js';
import { BehaviorTable } from "../core/modules/behaviorTable.js";
/**
 * Represents a Discord slash command definition, allowing for fluent configuration
 * of command metadata, options, execution logic, and internal tags.
 */
export declare class Command {
    #private;
    /**
     * Creates an instance of a Command.
     * @param {string} name - The unique name of the command (as it appears in Discord).
     */
    constructor(name: string);
    /**
     * Sets the description of the command that appears in the Discord UI.
     * @param {string} description - A brief description of the command's purpose.
     * @returns {this} The current Command instance for chaining.
     */
    description(description: string): this;
    /**
     * Adds a slash command option to this command.
     * @param {SlashOption} option - An instance of SlashOption to be added.
     * @throws {DisfoxError} Throws if the provided option is not an instance of SlashOption.
     * @returns {this} The current Command instance for chaining.
     */
    option(option: SlashOption): this;
    /**
     * Adds a tag to the command, defining specific behaviors during registration or execution.
     * @param {SlashTag} tag - The tag value from the SlashTag enum.
     * @throws {DisfoxError} Throws if the tag is invalid or has already been defined for this command.
     * @returns {this} The current Command instance for chaining.
     */
    mark(tag: SlashTag): this;
    dock(component: BehaviorTable): this;
    /**
     * Retrieves the internal configuration data of the command.
     * @returns {Object} An object containing the command metadata, options, tags, and action callback.
     */
    get data(): {
        name: string;
        description: string | null;
        contexts: InteractionContextType[];
        options: SlashOption[];
        tags: SlashTag[];
        action: (interaction: ChatInputCommandInteraction) => void;
        isDFXM: boolean;
        behaviorTable: BehaviorTable | undefined;
    };
    /**
     * Sets the callback function to be executed when the command is invoked.
     * @param {(interaction: Interaction) => void} callback - The function to run upon execution.
     * @returns {this} The current Command instance for chaining.
     */
    action(callback: (interaction: CommandInteraction) => void): this;
    hasBehaviorT(): boolean;
}
//# sourceMappingURL=slashServiceCommand.d.ts.map