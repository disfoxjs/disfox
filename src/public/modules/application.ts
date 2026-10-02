/*
    Disfox Application
*/

import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
import { ApplicationAction } from "../structs/applicationAction.js";
import { ApplicationEvents } from "../structs/applicationEvents.js";
import { ApplicationSlash } from "../structs/applicationSlash.js";
import { Client, ClientUser, GatewayIntentBits, IntentsBitField } from "discord.js";

interface SettingsType {
    client?: Client;
    token: string;
    intents?: IntentsBitField[]
}

export class Application {
    #client: Client;
    #token: string;
    actions: ApplicationAction;
    events: ApplicationEvents;
    slash: ApplicationSlash;
    /**
     * @deprecated Use {@link slash} instead. Removed in Disfox 0.0.5
     * Will be removed in Disfox 0.2.x
     */
    slashCommands: ApplicationSlash;

    constructor(settings: SettingsType | string) {
        const config = typeof settings === 'string'
            ? { token: settings }
            : settings;
        
        this.#client = config.client ?? new Client({
            intents: config.intents ?? [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        })
        this.#token = config.token
        this.actions = new ApplicationAction(this.#client, this.#token)
        this.events = new ApplicationEvents(this.#client)
        this.slash = new ApplicationSlash(this.#client)
        this.slashCommands = this.slash;
    }

    /**
     * @deprecated Use {@link client} instead.
     * Will be removed in Disfox 0.2.x
     */
    public get getClient() {
        if (!this.#client) {
            throw new Error(`The client is not defined.`)
        } 
        
        return this.#client
    }

    public get client(): Client {
        return this.#client
    }

    public get user(): ClientUser | null {
        return this.#client.user
    }

    /**
     * Connects the client to Discord.
     */
    public async connect(): Promise<void> {
        if (!this.#token) {
            throw new DisfoxError({
                code: DisfoxErrorCode.UNDEFINED_TOKEN,
                message: "Connection failed: Token is undefined.",
                details: "Unable to establish a Gateway connection because no authentication token was provided to the Application."
            });
        }
        try {
            await this.#client.login(this.#token)
        } catch (error: any) {
            throw new DisfoxError({
                code: DisfoxErrorCode.UNKNOWN,
                message: "Connection failed.",
                sourceError: error
            });
        }
    }

    /**
     * Restarts the Client connection to the Discord Gateway by destroying the current connection and reconnecting.
     * @returns {Promise<void>}
     */
    public async refresh(): Promise<void> {
        if (!this.#client.isReady()) {
            throw new DisfoxError({
                code: DisfoxErrorCode.APPLICATION_NOT_READY,
                message: "Refresh failed: Application is not ready.",
                details: "Application.refresh() can only be executed while the application is connected. Use Application.connect() to establish a connection to the Discord Gateway."
            });
        }

        await this.#client.destroy();
        await this.connect();
    }

    public addIntent(intent: GatewayIntentBits): void {
        this.#client.options.intents.add(intent)
    }

    public addIntents(...intents: GatewayIntentBits[]): void {
        for (const intent of intents) {
            this.#client.options.intents.add(intent);
        };
    }

    public removeIntent(intent: GatewayIntentBits): void {
        this.#client.options.intents.remove(intent)
    }

    public clearIntents(): void {
        this.#client.options.intents = new IntentsBitField(0);
    }
}


