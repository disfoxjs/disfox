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
var _ActionService_client, _ActionService_token;
import { sendC } from "../../../../../new/public/core/utils/sendchannel.js";
/**
 * Service for Discord client actions
 */
export class ActionService {
    /**
     * Creates an instance of ActionService
     * @param client - The Discord client
     * @param token - Bot token
     */
    constructor(client, token) {
        /** Discord client instance */
        _ActionService_client.set(this, void 0);
        /** Bot token */
        _ActionService_token.set(this, void 0);
        __classPrivateFieldSet(this, _ActionService_client, client, "f");
        __classPrivateFieldSet(this, _ActionService_token, token, "f");
    }
    /**
     * Returns the user's avatar hash
     * @returns Avatar hash string or undefined
     */
    getAvatar() {
        return __classPrivateFieldGet(this, _ActionService_client, "f")?.user?.avatar;
    }
    /**
     * Returns the user's avatar URL
     * @returns Avatar URL string
     */
    getAvatarUrl() {
        return __classPrivateFieldGet(this, _ActionService_client, "f")?.user?.displayAvatarURL();
    }
    /**
     * Sets the user's avatar
     * @param image - Image to set as avatar
     */
    async setAvatar(image) {
        await __classPrivateFieldGet(this, _ActionService_client, "f")?.user?.setAvatar(image);
    }
    /**
     * Sets the user's presence
     * @param activityType - Type of activity (PLAYING, WATCHING, LISTENING, etc.)
     * @param activityMessage - Activity message
     * @param status - User status (online, idle, dnd, invisible)
     */
    async setPresence(activityType, activityMessage, status) {
        await __classPrivateFieldGet(this, _ActionService_client, "f").user.setPresence({
            activities: [{ name: activityMessage, type: activityType }],
            status: status,
        });
    }
    /**
     * Sends a message to a channel
     * @param channelID - ID of the channel
     * @param content - Message content
     */
    async sendChannel(channelID, content) {
        if (!__classPrivateFieldGet(this, _ActionService_token, "f"))
            throw new Error("Client token is not defined.");
        sendC(__classPrivateFieldGet(this, _ActionService_token, "f"), channelID, content);
    }
    /**
     * Replies to a Discord interaction
     * @param interaction - Discord interaction object
     * @param reply - Content to reply with
     */
    async reply(interaction, reply) {
        if (interaction.replied || interaction.deferred) {
            console.error("Interaction already replied or deferred.");
            return;
        }
        await interaction.reply(reply);
    }
}
_ActionService_client = new WeakMap(), _ActionService_token = new WeakMap();
