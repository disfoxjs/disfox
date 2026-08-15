import { BehaviorTable } from "../modules/behaviorTable.js";
import { SlashTag } from "./slashTag.js";
import { SlashOption } from "../structs/slashServiceOption.js";
import { InteractionContextType, ChatInputCommandInteraction } from 'discord.js'

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