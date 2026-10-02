import { SlashOptions, SlashService } from "disfox";

const option = new SlashService.Option("choice")
    .type(SlashOptions.String)
    .required(true)
    .description("Select the weapon.")
    .choices({
        rock: "rock",
        paper: "paper",
        scissors: "scissors"
    });

const command = new SlashService.Command("rps")
    .description("Play Rock, Paper, Scissors against the bot!")
    .option(option)
    .action(async interaction => {
        const playerChoice = interaction.options.getString("choice", true);

        const choices = ["rock", "paper", "scissors"];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result;

        if (playerChoice === botChoice) {
            result = "It's a draw! 🤝";
        } else if (
            (playerChoice === "rock" && botChoice === "scissors") ||
            (playerChoice === "paper" && botChoice === "rock") ||
            (playerChoice === "scissors" && botChoice === "paper")
        ) {
            result = "You won! 🎉";
        } else {
            result = "You lost! 💀";
        }

        await interaction.reply(
            `You chose **${playerChoice}**.\n` +
            `The bot chose **${botChoice}**.\n\n` +
            result
        );
    });

export default command;