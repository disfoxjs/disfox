import { Events } from "discord.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.content.startsWith("!mean")) return;
        await message.reply({ content: `**@${message.author.displayName}**\n ${message.content}.`});
    }
}