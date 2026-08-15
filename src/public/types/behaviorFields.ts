export interface OnViolateFields {
    alert?: {
        content: string,
        flags?: number
    };
    sendDM?: {
        content: string,
    };
    function?: (...args : any[]) => void;
    applyTimeout?: {
        reason?: string,
        duration: number
    };
    applyVoiceMute?: {
        mute: boolean,
        reason?: string
    };
    kickOfGuild?: {
        reason?: string
    };
    banOfGuild?: {
        reason?: string,
        deleteMessageSeconds?: number
    }
}

export interface OnExecuteFields {
    sendDM?: {
        content: string,
    };
    function?: (...args : any[]) => void;
    kickOfGuild?: {
        reason?: string
    };
}

export interface RestrictedFields {
    userId?: string[];
    customId?: string[];
    roleId?: string[];
}

export interface AllowedFields {
    userId?: string[];
    customId?: string[];
    roleId?: string[];
}