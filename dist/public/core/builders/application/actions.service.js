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
export class ActionService {
    constructor(client, token) {
        _ActionService_client.set(this, void 0);
        _ActionService_token.set(this, void 0);
        this.actions = {
            getAvatar: () => {
                return __classPrivateFieldGet(this, _ActionService_client, "f")?.user?.avatar;
            },
            getAvatarUrl: () => {
                return __classPrivateFieldGet(this, _ActionService_client, "f")?.user?.displayAvatarURL();
            },
            setAvatar: async (image) => {
                await __classPrivateFieldGet(this, _ActionService_client, "f")?.user?.setAvatar(image);
            },
            setPresence: async (activityType, activityMessage, status) => {
                await __classPrivateFieldGet(this, _ActionService_client, "f").user.setPresence({
                    activities: [{ name: activityMessage, type: activityType }],
                    status: status
                });
            },
            sendChannel: async (channelID, content) => {
                const token = __classPrivateFieldGet(this, _ActionService_token, "f");
                if (!token)
                    throw new Error('Client Token is not defined.');
                sendC(token, channelID, content);
            },
            reply: async (interaction, reply) => {
                if (interaction.replied || interaction.deferred) {
                    console.error("Interaction alreary replied or deferred.");
                }
                else {
                    await interaction.reply(reply);
                }
            }
        };
        __classPrivateFieldSet(this, _ActionService_client, client, "f");
        __classPrivateFieldSet(this, _ActionService_token, token, "f");
    }
}
_ActionService_client = new WeakMap(), _ActionService_token = new WeakMap();
