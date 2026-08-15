import { BehaviorTable } from "../public/index.js";
import { Command } from "../public/structures/slashServiceCommand.js";
import { SlashCommandBuilder } from "discord.js";
export interface modifiedSlashCommandBuilder extends SlashCommandBuilder {
    disfoxData?: {
        behaviorTable: BehaviorTable | null;
    };
}
interface AdaptedResult {
    data: modifiedSlashCommandBuilder;
    execute: (...args: any[]) => any;
}
export declare function slashModelAdapter(command: Command): AdaptedResult;
export {};
//# sourceMappingURL=slashModel.d.mts.map