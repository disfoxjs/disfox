import { SlashService } from "disfox";

const command = new SlashService.Command("rps")
    .description("Play Rock, Paper, Scissors against the bot!")
    .action(async interaction => {
        const choices = ["rock", "paper", "scissors"];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        await interaction.reply(`The bot chose **${botChoice}**! Your turn to choose in the next update.`);
    });

export default command;
