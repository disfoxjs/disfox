import { ActivityType, Client, InteractionReplyOptions, PresenceStatusData, PresenceUpdateStatus, Status } from "discord.js";
import { sendC } from "../utils/sendchannel.js";
import { DisfoxError } from "../../private/_disfoxerror.js";
import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";

type AvatarInput = string | Buffer | ArrayBuffer | null;
/**
 * Types for sending or replying messages
 */


/**
 * Service for Discord client actions
 */
export class ApplicationAction {
    /** Discord client instance */
    #client: Client;

    /** Bot token */
    #token: string;

    /**
     * Creates an instance of ActionService
     * @param client - The Discord client
     * @param token - Bot token
     */
    constructor(client: Client, token: string) {
        this.#client = client;
        this.#token = token;
    }

    /**
     * Returns the user's avatar hash
     * @returns Avatar hash string or undefined
     */
    getAvatar() {
        return this.#client?.user?.avatar;
    }

    /**
     * Returns the user's avatar URL
     * @returns Avatar URL string
     */
    getAvatarUrl(): string | undefined {
        return this.#client?.user?.displayAvatarURL();
    }

    /**
     * Sets the user's avatar
     * @param image - Image to set as avatar
     */
    async setAvatar(image: AvatarInput): Promise<void> {
        await this.#client?.user?.setAvatar(image as any);
    }

    /**
     * Sets the user's presence
     * @param activityType - Type of activity (PLAYING, WATCHING, LISTENING, etc.)
     * @param activityMessage - Activity message
     * @param status - User status (online, idle, dnd, invisible)
     */
    async setPresence(
        activityType: ActivityType,
        activityMessage: string,
        status: PresenceStatusData
    ): Promise<void> {

        if (!this.#client.user) {
            throw new DisfoxError({
                code: DisfoxErrorCode.UNKNOWN,
                message: "Client user is not ready yet.",
                details: { method: ".setPresence()" }
            });
        }

        this.#client.user.setPresence({
            activities: [{ name: activityMessage, type: activityType }],
            status: status
        });
    }

    /**
     * Sends a message to a channel
     * @param channelID - ID of the channel
     * @param content - Message content
     */
    async sendChannel(channelID: string, content: InteractionReplyOptions): Promise<void> {
        if (!this.#token) throw new Error("Client token is not defined.");
        sendC(this.#token, channelID, content as any);
    }

    /**
     * Replies to a Discord interaction
     * @param interaction - Discord interaction object
     * @param reply - Content to reply with
     */
    async reply(interaction: any, reply: InteractionReplyOptions): Promise<void> {
        if (interaction.replied || interaction.deferred) {
            console.error("Interaction already replied or deferred.");
            return;
        }
        await interaction.reply(reply);
    }
}