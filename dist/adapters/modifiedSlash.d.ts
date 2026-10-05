import { SlashCommandBuilder } from "discord.js";
import { BehaviorTable } from "../public/index.js";
export interface modifiedSlashCommandBuilder extends SlashCommandBuilder {
    disfoxData?: {
        behaviorTable: BehaviorTable | null;
    };
}
//# sourceMappingURL=modifiedSlash.d.ts.map