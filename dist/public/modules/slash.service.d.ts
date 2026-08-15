import { Command } from "../structs/slashServiceCommand.js";
import { SlashOption } from "../structs/slashServiceOption.js";
import { SlashCommand } from "../types/slashTypes.js";
interface extractionOptions {
    autoConverts?: boolean;
    ignoreInvalidStructures?: boolean;
}
interface extractionValidates {
    valid: SlashCommand[];
    invalid: any[];
}
export declare class SlashService {
    static Option: typeof SlashOption;
    static Command: typeof Command;
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
    static extractSlashCommands(dir: string): Promise<{
        valid: SlashCommand[];
        invalid: any[];
    }>;
    static extractDir(dir: string, options: extractionOptions & {
        ignoreInvalidStructures: true;
    }): Promise<SlashCommand[]>;
    static extractDir(dir: string, options?: extractionOptions): Promise<extractionValidates>;
    /**
     * Extracts a slash command from a single file and validates its structure.
     * both `data` and `execute`.
     * Throws an error if the file extension is not `.js`.
     *
     * @param {string} filePath - Absolute or relative path to the command file.
     * @throws {DisfoxError} If the file extension is not supported.
     * @returns {Promise<SlashCommand[]>}
     */
    static extractFile(filePath: string): Promise<SlashCommand[]>;
}
export {};
//# sourceMappingURL=slash.service.d.ts.map