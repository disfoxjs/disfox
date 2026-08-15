import { Interaction, InteractionContextType } from "discord.js";
import { SlashInput } from "./slashinput.js";
import { SlashTag } from '../../../types/slashTag.js';
export declare class Command {
    #private;
    constructor(name: string);
    description(description: string): this;
    option(option: SlashInput): this;
    mark(tag: SlashTag): this;
    data: () => {
        name: string;
        description: string | null;
        contexts: InteractionContextType[];
        options: SlashInput[];
        tags: SlashTag[];
        action: (interaction: Interaction) => void;
    };
    action(callback: (interaction: Interaction) => void): this;
}
//# sourceMappingURL=command.d.ts.map