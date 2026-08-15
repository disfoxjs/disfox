import { ActivityType, Client, InteractionReplyOptions, PresenceStatusData } from "discord.js";
type AvatarInput = string | Buffer | ArrayBuffer | null;
/**
 * Types for sending or replying messages
 */
/**
 * Service for Discord client actions
 */
export declare class ApplicationAction {
    #private;
    /**
     * Creates an instance of ActionService
     * @param client - The Discord client
     * @param token - Bot token
     */
    constructor(client: Client, token: string);
    /**
     * Returns the user's avatar hash
     * @returns Avatar hash string or undefined
     */
    getAvatar(): string | null | undefined;
    /**
     * Returns the user's avatar URL
     * @returns Avatar URL string
     */
    getAvatarUrl(): string | undefined;
    /**
     * Sets the user's avatar
     * @param image - Image to set as avatar
     */
    setAvatar(image: AvatarInput): Promise<void>;
    /**
     * Sets the user's presence
     * @param activityType - Type of activity (PLAYING, WATCHING, LISTENING, etc.)
     * @param activityMessage - Activity message
     * @param status - User status (online, idle, dnd, invisible)
     */
    setPresence(activityType: ActivityType, activityMessage: string, status: PresenceStatusData): Promise<void>;
    /**
     * Sends a message to a channel
     * @param channelID - ID of the channel
     * @param content - Message content
     */
    sendChannel(channelID: string, content: InteractionReplyOptions): Promise<void>;
    /**
     * Replies to a Discord interaction
     * @param interaction - Discord interaction object
     * @param reply - Content to reply with
     */
    reply(interaction: any, reply: InteractionReplyOptions): Promise<void>;
}
export {};
//# sourceMappingURL=applicationAction.d.ts.map