import { SlashCommandAttachmentOption, SlashCommandBooleanOption, SlashCommandChannelOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption } from "discord.js";
export const SlashOptions = {
    String: SlashCommandStringOption,
    Number: SlashCommandNumberOption,
    Channel: SlashCommandChannelOption,
    Boolean: SlashCommandBooleanOption,
    Role: SlashCommandRoleOption,
    Attachment: SlashCommandAttachmentOption,
    Mentionable: SlashCommandMentionableOption
};
/*

import {
    SlashCommandAttachmentOption,
    SlashCommandBooleanOption,
    SlashCommandChannelOption,
    SlashCommandMentionableOption,
    SlashCommandNumberOption,
    SlashCommandRoleOption,
    SlashCommandStringOption
 } from "discord.js";

export const SlashOptions = {
    String: {
        option: SlashCommandStringOption,
        method: "addStringOption"
    },
    Number: {
        option: SlashCommandNumberOption,
        method: "addNumberOption"
    },
    Channel: {
        option: SlashCommandChannelOption,
        method: "addChannelOption"
    },
    Boolean: {
        option: SlashCommandBooleanOption,
        method: "addBooleanOption"
    },
    Role: {
        option: SlashCommandRoleOption,
        method: "addRoleOption"
    },
    Attachment: {
        option: SlashCommandAttachmentOption,
        method: "addAttachmentOption"
    },
    Mentionable: {
        option: SlashCommandMentionableOption,
        method: "addMentionableOption"
    }
} as const;

export type SlashOptions = typeof SlashOptions;

*/ 
