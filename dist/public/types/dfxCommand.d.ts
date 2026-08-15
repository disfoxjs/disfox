import { BehaviorTable } from "../core/modules/behaviorTable.js";
import { SlashTag } from "./slashTag.js";
import { SlashOption } from "../structures/slashServiceOption.js";
import { InteractionContextType, ChatInputCommandInteraction } from 'discord.js';
export type CommandData = {
    name: string;
    description: string | null;
    contexts: InteractionContextType[];
    options: SlashOption[];
    tags: SlashTag[];
    action: (interaction: ChatInputCommandInteraction) => void;
    isDFXM: boolean;
    behaviorTable: BehaviorTable;
};
//# sourceMappingURL=dfxCommand.d.ts.map