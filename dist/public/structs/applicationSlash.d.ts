import { Client } from "discord.js";
interface SlashListenOptions {
    onError?: {
        message?: string;
        flags?: number;
        callback?: (interaction: any, error: any) => any;
    };
}
export declare class ApplicationSlash {
    #private;
    listening: boolean;
    constructor(client: Client);
    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    deployGlobal(commands: any[]): Promise<void>;
    /**
     * Deploy slash commands to specific guilds.
     *
     * @param commands List of slash command objects.
     * @param guilds Guild IDs where the commands will be registered.
     */
    deployGuilds(commands: any[], guilds: string[]): Promise<void>;
    /**
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param listener Optional listener executed after a command runs successfully.
     */
    listen(data?: SlashListenOptions, listener?: (interaction: any) => any): Promise<void>;
    /**
    * close the listener for slash command executions.
    */
    close(): void;
}
export {};
//# sourceMappingURL=applicationSlash.d.ts.map