import { SlashService } from "disfox";

const c = new SlashService.Command('ping')
    .description("replies with pong")
    .action(async interaction => {
        await interaction.reply({
            content: "Pong!"
        });
    });

export default c;