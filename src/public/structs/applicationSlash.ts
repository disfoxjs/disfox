import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
import { Client, Events, Interaction } from "discord.js";
import { BehaviorTable } from "../modules/behaviorTable.js";
interface SlashListenOptions {
    onError?: {
        message?: string
        flags?: number
        callback?: (interaction: any, error: any) => any
    }
}

export class ApplicationSlash {
    #client: Client
    #globalSlash = new Map()
    #guildSlash = new Map()
    #listener: ((interaction : Interaction) => Promise<void>) | null = null

    listening: boolean = false;


    constructor(client: Client) {
        this.#client = client
    }

    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    async deployGlobal(commands: any[]) {
        
        if (this.#client == null) {
            throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Client probably is null",
                    "source": {
                        body: { "method": "SlashController.deployGlobal()" }
                    }
                })
        }

        if (this.#client.application == null) {
            throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Client application is not available.",
                    "source": {
                        body: { "method": "SlashController.deployGlobal()" }
                    }
                })
        }
        for (const command of commands) {
            this.#globalSlash.set(command.data.name, command)
        }

        await this.#client.application.commands.set(
            [...this.#globalSlash.values()].map(
                command => command.data.toJSON()
            )
        )
    }

    /**
     * Deploy slash commands to specific guilds.
     *
     * @param commands List of slash command objects.
     * @param guilds Guild IDs where the commands will be registered.
     */
    async deployGuilds(commands: any[], guilds: string[]) {
        
        for (const guildId of guilds) {

            const guild = this.#client.guilds.cache.get(String(guildId))

            if (!guild) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.GUILD_NOT_FOUND,
                    "message": "Unable to find the guild with the provided ID.",
                    "source": {
                        body: { "method": "SlashController.deployGuilds()" }
                    }
                })
            }

            for (const command of commands) {
                this.#guildSlash.set(command.data.name, command)
            }

            await guild.commands.set(
                commands.map(c => c.data.toJSON())
            )
        }
    }

    /**
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param listener Optional listener executed after a command runs successfully.
     */
    async listen(data: SlashListenOptions = {}, listener?: (interaction: any) => any) {

        if (this.listening) {
            throw new DisfoxError({
                code: DisfoxErrorCode.UNKNOWN,
                message: "Slash listener is already active.",
                source: {
                    body: { method: "SlashController.listen()" }
                }
            })
        }

        this.#listener = async (interaction: any) => {
       
            if (!interaction.isChatInputCommand()) return
            

            const cmd =
             this.#globalSlash.get(interaction.commandName) ??
             this.#guildSlash.get(interaction.commandName)

            if (!cmd) return

            try {

                const behaviorTable : BehaviorTable | null = cmd.data.disfoxData?.behaviorTable ?? null;

                if (behaviorTable) {
                    const task = await behaviorTable.attachment.execute({cmd: cmd, interaction: interaction})
                    if (!task.continue) return;
                }

                await cmd.execute(interaction)

                if (listener) {
                    try {
                        await listener(interaction)
                    } catch (err) {

                        throw new DisfoxError({
                            "code": DisfoxErrorCode.SLASH_EXECUTE,
                            "message": "Failed to execute Slash Command",
                            "source": {
                                body: { "method": "SlashController.listen()", "error": err }
                            }
                        })

                    }
                }

            } catch (err) {
                if (data.onError?.callback) {
                    return data.onError.callback(interaction, err)
                }

                const payload = {
                    content:
                        data.onError?.message ??
                        "An error occurred while executing this command. Please try again later.",
                    flags: data.onError?.flags
                }

                if (interaction.deferred) {
                    await interaction.editReply({
                        content: payload.content
                    })
                } else if (interaction.replied) {
                    await interaction.followUp(payload)
                } else {
                    await interaction.reply(payload)
                }
                
                console.error(new DisfoxError({
                    "code": DisfoxErrorCode.SLASH_EXECUTE,
                    "message": "Failed to execute Slash Command",
                    "source": {
                        body: { "method": "SlashController.listen()", "error": err }
                    }
                }))
            }
        }

        this.#client.on(Events.InteractionCreate, this.#listener)
        this.listening = true;

    }

     /**
     * close the listener for slash command executions.
     */
    close() {
        if (!this.#listener) return;

        this.#client.off(Events.InteractionCreate, this.#listener)
        this.#listener = null;
        this.listening = false;
    }

}

