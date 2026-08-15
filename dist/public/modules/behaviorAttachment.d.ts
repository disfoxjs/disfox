import { ChatInputCommandInteraction } from "discord.js";
import { modifiedSlashCommandBuilder } from "../../Adapters/command.js";
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
export declare class BehaviorAttachment {
    private static onViolateAdv;
    static execute(payload: payload): Promise<taskResponse>;
}
export {};
//# sourceMappingURL=behaviorAttachment.d.ts.map