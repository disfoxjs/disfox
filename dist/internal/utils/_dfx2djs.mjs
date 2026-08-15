import { SlashOptionType } from "./../../public/structures/slashOptions.js";
import { SlashTag } from "../../public/enums/slashTag.js";
import { Command } from "../../public/structures/slashServiceCommand.js";
import { DisfoxErrorCode } from "../../public/errors/_disfox.errorCode.js";
import { DisfoxError } from "../../public/errors/_disfoxerror.js";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
const methodMap = {
    [SlashOptionType.String]: "addStringOption",
    [SlashOptionType.Number]: "addNumberOption",
    [SlashOptionType.Boolean]: "addBooleanOption",
};
export function dfx2djsC(command) {
    if (!(command instanceof Command)) {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `InvalidArgumentError: Expected an instance of Command. Received: ${command}`,
            "source": { "body": {
                    method: `SlashService.getDFXFile`
                } },
        });
    }
    const data = command.cdata();
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
            const data = option.data;
            if (typeof data.inputDescription !== "string") {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.INVALID_TYPE,
                    "message": `Command description must be of type string. Received value: ${data.inputDescription}`,
                    "source": { "body": `SlashService.getDFXFile` },
                });
            }
            ;
            const method = methodMap[data.inputType];
            if (data.inputType === SlashOptionType.Number) {
                DJSCommand.addNumberOption(op => {
                    if (typeof data.settings.minNumber === `number`)
                        op.setMinValue(data.settings.minNumber);
                    if (typeof data.settings.maxNumber === `number`)
                        op.setMaxValue(data.settings.maxNumber);
                    op.setName(data.name);
                    op.setDescription(data.inputDescription);
                    return op;
                });
            }
            ;
        }
    }
    ;
    if (data.tags.length > 0) {
        for (const tag of data.tags) {
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
    DJSCommand.setDescription(data.description);
    result.data = DJSCommand;
    result.execute = data.action;
    return result;
}
