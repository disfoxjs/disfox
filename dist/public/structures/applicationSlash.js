var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ApplicationSlash_client, _ApplicationSlash_globalSlash, _ApplicationSlash_guildSlash, _ApplicationSlash_listener;
import { DisfoxErrorCode } from "../../../new/private/_disfox.errorCode.js";
import { DisfoxError } from "../../../new/private/_disfoxerror.js";
import { Events } from "discord.js";
export class ApplicationSlash {
    constructor(client) {
        _ApplicationSlash_client.set(this, void 0);
        _ApplicationSlash_globalSlash.set(this, new Map());
        _ApplicationSlash_guildSlash.set(this, new Map());
        _ApplicationSlash_listener.set(this, null);
        this.listening = false;
        __classPrivateFieldSet(this, _ApplicationSlash_client, client, "f");
    }
    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    async deployGlobal(commands) {
        if (__classPrivateFieldGet(this, _ApplicationSlash_client, "f") == null) {
            throw new DisfoxError({
                "code": DisfoxErrorCode.UNKNOWN,
                "message": "Client probably is null",
                "source": {
                    body: { "method": "SlashController.deployGuilds()" }
                }
            });
        }
        commands.map(command => __classPrivateFieldGet(this, _ApplicationSlash_globalSlash, "f").set(command.data.name, command));
        for (const command of commands) {
            __classPrivateFieldGet(this, _ApplicationSlash_client, "f").application.commands.create(command.data.toJSON());
        }
    }
    /**
     * Deploy slash commands to specific guilds.
     *
     * @param commands List of slash command objects.
     * @param guilds Guild IDs where the commands will be registered.
     */
    async deployGuilds(commands, guilds) {
        for (const guildId of guilds) {
            const guild = __classPrivateFieldGet(this, _ApplicationSlash_client, "f").guilds.cache.get(String(guildId));
            if (!guild) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.GUILD_NOT_FOUND,
                    "message": "Unable to find the guild with the provided ID.",
                    "source": {
                        body: { "method": "SlashController.deployGuilds()" }
                    }
                });
            }
            for (const command of commands) {
                __classPrivateFieldGet(this, _ApplicationSlash_guildSlash, "f").set(command.data.name, command);
            }
            await guild.commands.set(commands.map(c => c.data.toJSON()));
        }
    }
    /**
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param listener Optional listener executed after a command runs successfully.
     */
    async listen(data = {}, listener) {
        const all = [
            ...__classPrivateFieldGet(this, _ApplicationSlash_globalSlash, "f").values(),
            ...__classPrivateFieldGet(this, _ApplicationSlash_guildSlash, "f").values()
        ];
        __classPrivateFieldSet(this, _ApplicationSlash_listener, async (interaction) => {
            if (!interaction.isChatInputCommand())
                return;
            const cmd = all.find(c => c.data.name === interaction.commandName);
            if (!cmd)
                return;
            try {
                const behaviorTable = cmd.data.disfoxData?.behaviorTable ?? null;
                if (behaviorTable) {
                    const task = await behaviorTable.attachment.execute({ cmd: cmd, interaction: interaction });
                    if (!task.continue)
                        return;
                }
                await cmd.execute(interaction);
                if (listener) {
                    try {
                        await listener(interaction);
                    }
                    catch (err) {
                        throw new DisfoxError({
                            "code": DisfoxErrorCode.SLASH_EXECUTE,
                            "message": "Failed to execute Slash Command",
                            "source": {
                                body: { "method": "SlashController.listen()", "error": err }
                            }
                        });
                    }
                }
            }
            catch (err) {
                if (data.onError?.callback) {
                    return data.onError.callback(interaction, err);
                }
                const payload = {
                    content: data.onError?.message ??
                        "An error occurred while executing this command. Please try again later.",
                    flags: data.onError?.flags
                };
                if (!interaction.replied || interaction.deferred) {
                    await interaction.reply(payload);
                }
                throw new DisfoxError({
                    "code": DisfoxErrorCode.SLASH_EXECUTE,
                    "message": "Failed to execute Slash Command",
                    "source": {
                        body: { "method": "SlashController.listen()", "error": err }
                    }
                });
            }
        }, "f");
        __classPrivateFieldGet(this, _ApplicationSlash_client, "f").on(Events.InteractionCreate, __classPrivateFieldGet(this, _ApplicationSlash_listener, "f"));
    }
    /**
    * close the listener for slash command executions.
    */
    close() {
        if (!__classPrivateFieldGet(this, _ApplicationSlash_listener, "f"))
            return;
        __classPrivateFieldGet(this, _ApplicationSlash_client, "f").off(Events.InteractionCreate, __classPrivateFieldGet(this, _ApplicationSlash_listener, "f"));
        __classPrivateFieldSet(this, _ApplicationSlash_listener, null, "f");
        this.listening = false;
    }
}
_ApplicationSlash_client = new WeakMap(), _ApplicationSlash_globalSlash = new WeakMap(), _ApplicationSlash_guildSlash = new WeakMap(), _ApplicationSlash_listener = new WeakMap();
