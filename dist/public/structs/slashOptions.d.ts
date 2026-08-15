import { SlashCommandAttachmentOption, SlashCommandBooleanOption, SlashCommandChannelOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption } from "discord.js";
export declare const SlashOptions: {
    readonly String: typeof SlashCommandStringOption;
    readonly Number: typeof SlashCommandNumberOption;
    readonly Channel: typeof SlashCommandChannelOption;
    readonly Boolean: typeof SlashCommandBooleanOption;
    readonly Role: typeof SlashCommandRoleOption;
    readonly Attachment: typeof SlashCommandAttachmentOption;
    readonly Mentionable: typeof SlashCommandMentionableOption;
};
export type SlashOptions = typeof SlashOptions;
//# sourceMappingURL=slashOptions.d.ts.map