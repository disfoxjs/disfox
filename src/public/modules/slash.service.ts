import fs from "fs"
import path from "path";
import { Command } from "../structs/slashServiceCommand.js";
import { SlashOption } from "../structs/slashServiceOption.js";
import { SlashCommand } from "../types/slashTypes.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
import { Adapters } from "../../Adapters/adapters.js";

interface extractionOptions {
    autoConverts?: boolean;
    ignoreInvalidStructures?: boolean;
}

interface extractionValidates {
    valid : SlashCommand[]
    invalid : any[]
}

export class SlashService {
    static Option = SlashOption;
    static Command = Command;
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
    static async extractSlashCommands(dir: string) {
        console.warn("The `SlashService.extractSlashCommands` method was deprecated in Disfox v0.0.5.\nUse `SlashService.extractFile()` or `SlashService.extractDir()`.")
        const cmdsPath = path.resolve(dir)
        const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"))
        const valid: SlashCommand[] = []
        const invalid: any[] = []

        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const command = imported.default ?? imported;
            
            if ("data" in command && "execute" in command) {
                valid.push(command)
            } else {
                invalid.push(command)
            }
        }

        return {valid, invalid};
    }

    
    static async extractDir(
        dir: string, 
        options: extractionOptions & { ignoreInvalidStructures: true }
    ): Promise<SlashCommand[]>;

    
    static async extractDir(
        dir: string, 
        options?: extractionOptions
    ): Promise<extractionValidates>;

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
    static async extractDir(dir: string, options? : extractionOptions) : Promise<extractionValidates | SlashCommand[]> {
        const cmdsPath = path.resolve(dir);
        const files = fs.readdirSync(cmdsPath);
        const valid: SlashCommand[] = []
        const invalid: any[] = []

        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);

            let COMMAND : Command | any = imported.default ?? imported
        
            if ((COMMAND as Command).data?.isDFXM)
                if (options?.autoConverts || options == undefined)
                    COMMAND = Adapters.slashModel(COMMAND);
            

            if ("data" in COMMAND && "execute" in COMMAND) {
                valid.push(COMMAND)
            } else {   
                invalid.push(COMMAND)
            }
        }

        if (options?.ignoreInvalidStructures) return valid;
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
    static async extractFile(filePath: string) : Promise<SlashCommand[]> {
        const resolved = path.resolve(filePath)

        const imported = await import(`file://${resolved.replace(/\\/g, "/")}`)
        let COMMAND = imported.default ?? imported
        
        if (COMMAND.cdata?.().isDFXM) COMMAND = Adapters.slashModel(COMMAND);
    
        return [COMMAND];
    }

}

