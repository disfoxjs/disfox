import { SlashOptions } from "../../../new/public/index.js";
import { Command } from "../../../new/public/structures/command.js";
import { DisfoxErrorCode } from "../../../new/internal/errors/_disfox.errorCode.js";
import { DisfoxError } from "../../../new/internal/errors/_disfoxerror.js";
import { SlashCommandBuilder } from "discord.js";
export function _Dfx2DjsC(command) {
    if (!(command instanceof Command)) {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `InvalidArgumentError: Expected an instance of Command. Received: ${command}`,
            "source": { "body": {
                    method: `SlashService.getDFXFile`
                } },
        });
    }
    const data = command.data();
    let result = {
        data: null,
        execute: null
    };
    const DJSCommand = new SlashCommandBuilder()
        .setName(data.name);
    if (typeof data.description !== "string") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command description must be of type string. Received value: ${data.description}`,
            "source": { "body": `SlashService.getDFXFile` },
        });
    }
    ;
    if (typeof data.action !== "function") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command action must be of type function. Received value: ${data.action}`,
            "source": { "body": `SlashService.getDFXFile` },
        });
    }
    ;
    if (Array.isArray(data.options) && data.options.length > 0) {
        for (const option of data.options) {
            if (typeof option._inputDescription !== "string") {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.INVALID_TYPE,
                    "message": `Command description must be of type string. Received value: ${data.description}`,
                    "source": { "body": `SlashService.getDFXFile` },
                });
            }
            ;
            if (option._inputType === SlashOptions.String) {
                DJSCommand.addStringOption(op => {
                    op.setName(option.name);
                    op.setDescription(option._inputDescription);
                    op.setRequired(option._isRequired);
                    return op;
                });
            }
            ;
            if (option._inputType === SlashOptions.Number) {
                DJSCommand.addNumberOption(op => {
                    if (typeof option._settings.minNumber === `number`)
                        op.setMinValue(option._settings.minNumber);
                    if (typeof option._settings.maxNumber === `number`)
                        op.setMaxValue(option._settings.maxNumber);
                    op.setName(option.name);
                    op.setDescription(option._inputDescription);
                    return op;
                });
            }
            ;
            if (option._inputType == SlashOptions.Mentionable) {
                DJSCommand.addMentionableOption(input => {
                    input.setName(option.name).setDescription(option._inputDescription);
                    input.setRequired(option._isRequired);
                    return input;
                });
            }
            ;
            if (option._inputType == SlashOptions.Boolean) {
                DJSCommand.addBooleanOption(input => {
                    input.setName(option.name).setDescription(option._inputDescription);
                    input.setRequired(option._isRequired);
                    return input;
                });
            }
        }
    }
    ;
    DJSCommand.setDescription(data.description);
    result.data = DJSCommand;
    result.execute = data.action;
    return result;
}
