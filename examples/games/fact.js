import { SlashService } from "disfox";

const command = new SlashService.Command("fact")
    .description("Replies with a random fun fact!")
    .action(async interaction => {
        await interaction.reply("Did you know that a single strand of spaghetti is called a 'spaghetto'?");
    });

export default command;
