import { SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("hello")
    .description("replies with World!")
    .mark(SlashTag.AdminOnly)
    .action(async interaction => {
        await interaction.reply("World!")
    });

export default command;
