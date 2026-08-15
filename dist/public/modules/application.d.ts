import { ApplicationAction } from "../structs/applicationAction.js";
import { ApplicationEvents } from "../structs/applicationEvents.js";
import { ApplicationSlash } from "../structs/applicationSlash.js";
import { Client } from "discord.js";
interface SettingsType {
    client: Client;
    token: string;
}
export declare class Application {
    #private;
    actions: ApplicationAction;
    events: ApplicationEvents;
    slash: ApplicationSlash;
    /**
     * @deprecated Use {@link slash} instead. Removed in Disfox 0.0.5
     */
    slashCommands: ApplicationSlash;
    constructor(settings: SettingsType);
    /**
     * @deprecated Use {@link client} instead.
     */
    get getClient(): Client<boolean>;
    get client(): Client<boolean>;
    get user(): import("discord.js").ClientUser;
    /**
     * Connects the client to Discord.
     */
    connect(): Promise<void>;
}
export {};
//# sourceMappingURL=application.d.ts.map