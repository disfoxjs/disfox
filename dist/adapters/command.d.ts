import { Command } from "../public/structs/slashServiceCommand.js";
import { modifiedSlashCommandBuilder } from "./modifiedSlash.js";
interface AdaptedResult {
    data: modifiedSlashCommandBuilder;
    execute: (...args: any[]) => any;
}
export declare function slashModelAdapter(command: Command): AdaptedResult;
export {};
//# sourceMappingURL=command.d.ts.map