import { ApplicationAction } from "../structs/applicationAction.js";
import { ApplicationEvents } from "../structs/applicationEvents.js";
import { ApplicationSlash } from "../structs/applicationSlash.js";
import { Client, ClientUser, GatewayIntentBits, IntentsBitField } from "discord.js";
interface SettingsType {
    client?: Client;
    token: string;
    intents?: IntentsBitField[];
}
export declare class Application {
    #private;
    actions: ApplicationAction;
    events: ApplicationEvents;
    slash: ApplicationSlash;
    /**
     * @deprecated Use {@link slash} instead. Removed in Disfox 0.0.5
     * Will be removed in Disfox 0.2.x
     */
    slashCommands: ApplicationSlash;
    constructor(settings: SettingsType | string);
    /**
     * @deprecated Use {@link client} instead.
     * Will be removed in Disfox 0.2.x
     */
    get getClient(): Client<boolean>;
    get client(): Client;
    get user(): ClientUser | null;
    /**
     * Connects the client to Discord.
     */
    connect(): Promise<void>;
    /**
     * Restarts the Client connection to the Discord Gateway by destroying the current connection and reconnecting.
     * @returns {Promise<void>}
     */
    refresh(): Promise<void>;
    addIntent(intent: GatewayIntentBits): void;
    addIntents(...intents: GatewayIntentBits[]): void;
    removeIntent(intent: GatewayIntentBits): void;
    clearIntents(): void;
}
export {};
//# sourceMappingURL=application.d.ts.map