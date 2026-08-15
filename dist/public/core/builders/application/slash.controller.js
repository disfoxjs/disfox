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
var _SlashController_client, _SlashController_globalSlash, _SlashController_guildSlash;
import { DisfoxErrorCode } from "../../../../../new/internal/errors/_disfox.errorCode.js";
import { DisfoxError } from "../../../../../new/internal/errors/_disfoxerror.js";
import { Response } from "../../../../../new/public/core/builders/response.js";
export class SlashController {
    constructor(client) {
        _SlashController_client.set(this, void 0);
        _SlashController_globalSlash.set(this, new Map());
        _SlashController_guildSlash.set(this, new Map());
        __classPrivateFieldSet(this, _SlashController_client, client, "f");
    }
    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    async deployGlobal(commands) {
        commands.map(command => __classPrivateFieldGet(this, _SlashController_globalSlash, "f").set(command.data.name, command));
        await __classPrivateFieldGet(this, _SlashController_client, "f").application.commands.set(commands.map(c => c.data.toJSON()));
    }
    /**
     * Deploy slash commands to specific guilds.
     *
     * @param commands List of slash command objects.
     * @param guilds Guild IDs where the commands will be registered.
     */
    async deployGuilds(commands, guilds) {
        for (const guildId of guilds) {
            const guild = __classPrivateFieldGet(this, _SlashController_client, "f").guilds.cache.get(String(guildId));
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
                __classPrivateFieldGet(this, _SlashController_guildSlash, "f").set(command.data.name, command);
            }
            await guild.commands.set(commands.map(c => c.data.toJSON()));
        }
    }
    /**
     * @deprecated Will be removed in v0.0.5.
     * Use {@link listen} instead.
     */
    async listenCommands(commands, onErrorMessage = "An error occurred while executing this command. Please try again later.") {
        console.warn("The `.extractSlashCommands()` method was deprecated in Disfox v0.0.5.\nUse `SlashService.extractFile()` or `SlashService.extractDir()`.");
        const res = new Response({ commands, onErrorMessage });
        __classPrivateFieldGet(this, _SlashController_client, "f").on("interactionCreate", async (interaction) => {
            if (!interaction.isChatInputCommand())
                return;
            const cmd = commands.find(c => c.data.name === interaction.commandName);
            if (!cmd)
                return;
            try {
                await cmd.execute(interaction);
                return interaction;
            }
            catch (err) {
                await interaction.reply(onErrorMessage);
                console.error(res.error({
                    message: "Failed to execute Slash Command.",
                    code: "sl_exe_err",
                    content: err
                }).result);
            }
        });
    }
    /**
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param callback Optional callback executed after a command runs successfully.
     */
    async listen(data = {}, callback) {
        const all = [
            ...__classPrivateFieldGet(this, _SlashController_globalSlash, "f").values(),
            ...__classPrivateFieldGet(this, _SlashController_guildSlash, "f").values()
        ];
        __classPrivateFieldGet(this, _SlashController_client, "f").on("interactionCreate", async (interaction) => {
            if (!interaction.isChatInputCommand())
                return;
            const cmd = all.find(c => c.data.name === interaction.commandName);
            if (!cmd)
                return;
            try {
                await cmd.execute(interaction);
                if (callback) {
                    try {
                        await callback(interaction);
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
        });
    }
}
_SlashController_client = new WeakMap(), _SlashController_globalSlash = new WeakMap(), _SlashController_guildSlash = new WeakMap();
