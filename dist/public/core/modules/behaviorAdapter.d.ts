import { ChatInputCommandInteraction } from "discord.js";
import { modifiedSlashCommandBuilder } from "../../../adapters/slashModel.mjs";
interface payload {
    cmd: {
        data: modifiedSlashCommandBuilder;
        execute: (interaction: ChatInputCommandInteraction) => any;
    };
    interaction: ChatInputCommandInteraction;
}
interface taskResponse {
    continue: boolean;
}
export declare class BehaviorAdapter {
    private static throw_execError;
    private static adv;
    static execute(payload: payload): Promise<taskResponse>;
}
export {};
//# sourceMappingURL=behaviorAdapter.d.ts.map