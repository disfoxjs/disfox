import { ApplicationAction } from "../structs/applicationAction.js";
import { ApplicationEvents } from "../structs/applicationEvents.js";
import { ApplicationSlash } from "../structs/applicationSlash.js";
import { Client } from "discord.js";

interface SettingsType {
    client: Client
    token: string
}

export class Application {
    #client: Client;
    #token: string;
    actions: ApplicationAction;
    events: ApplicationEvents;
    slash: ApplicationSlash;
    /**
     * @deprecated Use {@link slash} instead. Removed in Disfox 0.0.5
     */
    slashCommands: ApplicationSlash;
    constructor(settings: SettingsType) {
        this.#client = settings.client
        this.#token = settings.token
        this.actions = new ApplicationAction(this.#client, this.#token)
        this.events = new ApplicationEvents(this.#client)
        this.slash = new ApplicationSlash(this.#client)
        this.slashCommands = this.slash
    }

    /**
     * @deprecated Use {@link client} instead.
     */
    public get getClient() {
        if (!this.#client) {
            throw new Error(`The client is not defined.`)
            
        } 
        
        return this.#client
        
    }

    public get client() {
        if (this.#client == null) {
            throw new Error(`The client is not defined.`)
        } else {
            return this.#client
        }
    }

    public get user() {
        if (this.#client.user == null) {
            throw new Error('The client is not logged in. User is null.')
        } else {
            return this.#client.user
        }
    }

    /**
     * Connects the client to Discord.
     */
    public async connect() {
        if (!this.#token) {
            throw new Error("Token is not defined.")
        }
        await this.#client.login(this.#token)
    }

}


