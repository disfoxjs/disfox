import { Command } from "../../structures/slashServiceCommand.js";
import { OnViolateFields, OnExecuteFields, RestrictedFields, AllowedFields } from "../../types/behaviorFields.js";
import { BehaviorAttachment } from "./behaviorAttachment.js";
export declare enum BehaviorContext {
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
export declare class BehaviorTable {
    config: BehaviorConfig;
    attachment: typeof BehaviorAttachment;
    constructor(config: BehaviorConfig);
    static getTable(instance: Command): BehaviorTable | undefined;
}
export {};
//# sourceMappingURL=behaviorTable.d.ts.map