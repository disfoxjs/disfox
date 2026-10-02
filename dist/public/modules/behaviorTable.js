import { BehaviorAttachment } from "./behaviorAttachment.js";
export var BehaviorContext;
(function (BehaviorContext) {
    BehaviorContext[BehaviorContext["SlashCommand"] = 1] = "SlashCommand";
    BehaviorContext[BehaviorContext["Message"] = 2] = "Message";
})(BehaviorContext || (BehaviorContext = {}));
export class BehaviorTable {
    config;
    attachment = BehaviorAttachment;
    constructor(config) {
        this.config = config;
    }
    static getTable(instance) {
        return instance.data.behaviorTable;
    }
}
