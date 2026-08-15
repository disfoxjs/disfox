import fs from "fs";
import path from "path";
import { Command } from "../structs/slashServiceCommand.js";
import { SlashOption } from "../structs/slashServiceOption.js";
import { Adapters } from "../../Adapters/adapters.js";
export class SlashService {
    /**
     * Extracts slash commands from a directory and validates their structure.
     * A command is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid commands.
     *
     * @param {string} dir - Path to the commands directory.
     * @returns {Promise<ValidSlash>} Object containing valid and invalid commands.
     *
     * @deprecated This method will be removed in v0.0.5
     * use extractSlashDir() or extractSlashFile()
     */
    static async extractSlashCommands(dir) {
        console.warn("The `SlashService.extractSlashCommands` method was deprecated in Disfox v0.0.5.\nUse `SlashService.extractFile()` or `SlashService.extractDir()`.");
        const cmdsPath = path.resolve(dir);
        const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"));
        const valid = [];
        const invalid = [];
        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const command = imported.default ?? imported;
            if ("data" in command && "execute" in command) {
                valid.push(command);
            }
            else {
                invalid.push(command);
            }
        }
        return { valid, invalid };
    }
    /**
     * Extracts slash commands from a directory and validates their structure.
     *
     * Each `.js` file inside the provided directory is dynamically imported.
     * A command is considered valid only if it exports both `data` and `execute`.
     *
     * The result separates valid and invalid command modules.
     *
     *
     * An object containing arrays of valid and invalid commands.
     */
    static async extractDir(dir, options) {
        const cmdsPath = path.resolve(dir);
        const files = fs.readdirSync(cmdsPath);
        const valid = [];
        const invalid = [];
        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            let COMMAND = imported.default ?? imported;
            if (COMMAND.data?.isDFXM)
                if (options?.autoConverts || options == undefined)
                    COMMAND = Adapters.slashModel(COMMAND);
            if ("data" in COMMAND && "execute" in COMMAND) {
                valid.push(COMMAND);
            }
            else {
                invalid.push(COMMAND);
            }
        }
        if (options?.ignoreInvalidStructures)
            return valid;
        return { valid, invalid };
    }
    /**
     * Extracts a slash command from a single file and validates its structure.
     * both `data` and `execute`.
     * Throws an error if the file extension is not `.js`.
     *
     * @param {string} filePath - Absolute or relative path to the command file.
     * @throws {DisfoxError} If the file extension is not supported.
     * @returns {Promise<SlashCommand[]>}
     */
    static async extractFile(filePath) {
        const resolved = path.resolve(filePath);
        const imported = await import(`file://${resolved.replace(/\\/g, "/")}`);
        let COMMAND = imported.default ?? imported;
        if (COMMAND.cdata?.().isDFXM)
            COMMAND = Adapters.slashModel(COMMAND);
        return [COMMAND];
    }
}
SlashService.Option = SlashOption;
SlashService.Command = Command;
