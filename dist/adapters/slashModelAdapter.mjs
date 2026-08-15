import { SlashOptions, SlashTag } from "../public/index.js";
import { Command } from "../public/structures/slashServiceCommand.js";
import { DisfoxErrorCode } from "../public/errors/_disfox.errorCode.js";
import { DisfoxError } from "../public/errors/_disfoxerror.js";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
export function slashModelAdapter(command) {
    if (!(command instanceof Command)) {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `InvalidArgumentError: Expected an instance of Command. Received: ${command}`,
            "source": { "body": {
                    method: `SlashService.getDFXFile`
                } },
        });
    }
    const commandData = command.data;
    let result = {
        data: null,
        execute: null
    };
    const DJSCommand = new SlashCommandBuilder()
        .setName(commandData.name);
    if (typeof commandData.description !== "string") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command description must be of type string. Received value: ${commandData.description}`,
            "source": { "body": `SlashService.getDFXFile` },
        });
    }
    ;
    if (typeof commandData.action !== "function") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command action must be of type function. Received value: ${commandData.action}`,
            "source": { "body": `SlashService.getDFXFile` },
        });
    }
    ;
    if (Array.isArray(commandData.options) && commandData.options.length > 0) {
        for (const option of commandData.options) {
            const optionData = option.data;
            if (typeof optionData.description !== "string") {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.INVALID_TYPE,
                    "message": `Command description must be of type string. Received value: ${optionData.description}`,
                    "source": { "body": `SlashService.getDFXFile` },
                });
            }
            ;
            if (optionData.type === SlashOptions.String) {
                DJSCommand.addStringOption(op => {
                    op.setName(optionData.name);
                    op.setDescription(optionData.description);
                    op.setRequired(optionData.required);
                    return op;
                });
            }
            ;
            if (optionData.type === SlashOptions.Number) {
                DJSCommand.addNumberOption(op => {
                    if (typeof optionData.settings.minNumber === `number`)
                        op.setMinValue(optionData.settings.minNumber);
                    if (typeof optionData.settings.maxNumber === `number`)
                        op.setMaxValue(optionData.settings.maxNumber);
                    op.setName(optionData.name);
                    op.setDescription(optionData.description);
                    return op;
                });
            }
            ;
            if (optionData.type == SlashOptions.Mentionable) {
                DJSCommand.addMentionableOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
            }
            ;
            if (optionData.type == SlashOptions.Boolean) {
                DJSCommand.addBooleanOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
            }
            if (optionData.type == SlashOptions.Role) {
                DJSCommand.addRoleOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
            }
            if (optionData.type == SlashOptions.Attachment) {
                DJSCommand.addAttachmentOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
            }
        }
    }
    ;
    if (commandData.tags.length > 0) {
        for (const tag of commandData.tags) {
            switch (tag) {
                case SlashTag.NSFW:
                    DJSCommand.setNSFW(true);
                    break;
                case SlashTag.AdminOnly:
                    DJSCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
                    break;
            }
        }
    }
    DJSCommand.setDescription(commandData.description);
    result.data = DJSCommand;
    result.execute = commandData.action;
    return result;
}
