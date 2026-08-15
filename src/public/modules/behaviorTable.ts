import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
import { Command } from "../structs/slashServiceCommand.js";
import { SlashService } from "./slash.service.js";
import {
    OnViolateFields,
    OnExecuteFields,
    RestrictedFields,
    AllowedFields,
} from "../types/behaviorFields.js"
import { BehaviorAttachment } from "./behaviorAttachment.js";

export enum BehaviorContext {
    SlashCommand = 1,
    Message = 2
}

interface BehaviorConfig {
    context?: BehaviorContext;
    onViolate?: OnViolateFields;
    onExecute?: OnExecuteFields;
    restricted?: RestrictedFields;
    allowed?: AllowedFields;

}

export class BehaviorTable {
    config : BehaviorConfig
    attachment = BehaviorAttachment

    constructor(config : BehaviorConfig) {
        this.config = config;
    }

    static getTable(instance : Command) {
        return instance.data.behaviorTable
    }

    
}