import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashTag } from "../public/index.js";
import { Command } from "../public/structs/slashServiceCommand.js";
import { DisfoxErrorCode } from "../private/_disfox.errorCode.js";
import { DisfoxError } from "../private/_disfoxerror.js";
import slashOptionAdapter from "./optionAdapter.js";
export function slashModelAdapter(command) {
    if (!(command instanceof Command)) {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `InvalidArgumentError: Expected an instance of Command. But: ${command}`,
            "source": { "body": {
                    method: `SlashService.getDFXFile()`
                } },
        });
    }
    const commandData = command.data;
    let behaviorTable;
    behaviorTable = commandData.behaviorTable;
    const DJSCommand = new SlashCommandBuilder()
        .setName(commandData.name);
    if (behaviorTable) {
        DJSCommand.disfoxData = {
            behaviorTable: behaviorTable
        };
    }
    if (typeof commandData.description !== "string") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command description must be of type string. But: ${commandData.description}`,
            "source": { "body": `SlashService.getDFXFile` },
        });
    }
    ;
    if (typeof commandData.action !== "function") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command action must be of type function. But: ${commandData.action}`,
            "source": { "body": `SlashService.getDFXFile` },
        });
    }
    ;
    if (Array.isArray(commandData.options) && commandData.options.length > 0)
        slashOptionAdapter(command, DJSCommand);
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
    return {
        data: DJSCommand,
        execute: commandData.action
    };
}
