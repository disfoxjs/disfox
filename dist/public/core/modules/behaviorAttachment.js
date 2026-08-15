import { DisfoxError } from "../../../../new/private/_disfoxerror.js";
import { DisfoxErrorCode } from "../../../../new/private/_disfox.errorCode.js";
export class BehaviorAttachment {
    static async onViolateAdv(payload) {
        const cmd = payload.cmd;
        const i = payload.interaction;
        const t = cmd.data.disfoxData?.behaviorTable;
        const field = t?.config.onViolate;
        const allowed = t?.config.allowed;
        const conditions = {
            "alreadyReplied": false,
            "opc": false
        };
        if (!t || !field)
            return { "alreadyReplied": false, "opc": false };
        const member = i.member;
        const isAllowed = allowed?.roleId?.some(roleId => member.roles.cache.has(roleId)) || allowed?.userId?.includes(i.user.id);
        if (isAllowed) {
            return conditions;
        }
        if (field.alert) {
            const messageContent = {
                content: field.alert.content,
                flags: field.alert.flags
                    || undefined
            };
            if (i.replied) {
                await i.editReply(messageContent);
            }
            else
                await i.reply(messageContent);
            conditions.alreadyReplied = true;
        }
        if (field.sendDM) {
            try {
                await i.user.send(field.sendDM.content);
            }
            catch (err) {
                throw new Error(`Error to execute BehaviorTable: ${err}`);
            }
        }
        if (field.function) {
            try {
                await field.function();
            }
            catch (err) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Failed to execute function",
                    "details": {
                        "source_err": err,
                        "received": field.function
                    }
                });
            }
        }
        if (field.applyTimeout) {
            const member = i.member;
            try {
                const d = field.applyTimeout.duration * 1000;
                await member.timeout(d, field.applyTimeout.reason);
            }
            catch (err) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Failed to apply timeout to the target member.",
                    "details": {
                        "source_err": err,
                        "received": field.applyTimeout
                    }
                });
            }
        }
        if (field.applyVoiceMute) {
            const member = i.member;
            try {
                await member.voice.setMute(field.applyVoiceMute.mute, field.applyVoiceMute.reason);
            }
            catch (err) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Failed to apply VoiceMute to the target member.",
                    "details": {
                        "source_err": err,
                        "received": field.applyVoiceMute
                    }
                });
            }
        }
        if (field.banOfGuild) {
            const member = i.member;
            try {
                await member.ban({
                    "deleteMessageSeconds": field.banOfGuild.deleteMessageSeconds,
                    "reason": field.banOfGuild.reason
                });
            }
            catch (err) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Failed to ban to the target member.",
                    "details": {
                        "source_err": err,
                        "received": field.banOfGuild
                    }
                });
            }
        }
        if (field.kickOfGuild) {
            const member = i.member;
            try {
                await member.kick(field.kickOfGuild.reason);
            }
            catch (err) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Failed to kick to the target member.",
                    "details": {
                        "source_err": err,
                        "received": field.kickOfGuild
                    }
                });
            }
        }
        return conditions;
    }
    static async execute(payload) {
        const t = payload.cmd.data.disfoxData?.behaviorTable;
        const conditions = {
            alreadyReplied: false,
            opc: false
        };
        if (!t)
            return { continue: true };
        const hasRestrictions = t.config.restricted?.roleId?.length || t.config.restricted?.userId?.length;
        if (t.config.onViolate && hasRestrictions) {
            const c = await this.onViolateAdv(payload);
            if (c.alreadyReplied) {
                conditions.alreadyReplied = true;
            }
            else if (c.opc)
                conditions.opc = true;
        }
        if (conditions.alreadyReplied)
            return { continue: false };
        return { continue: true };
    }
}
