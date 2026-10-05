import "dotenv/config"
import { Events } from "discord.js"
import { SlashService, Application, EventService } from "disfox"

if (!process.env.TK) {
    throw new Error("Token not found in .env")
}

const app = new Application(process.env.TK)

const commands = await SlashService.extractDir("./examples/commands");
const gamesCommands = await SlashService.extractDir("./examples/games");
const events = await EventService.extractDir("./examples/events");

// Register listeners BEFORE connecting.
app.events.listenEvents(events.valid);

app.client.once(Events.ClientReady, async () => {
    await app.slash.deployGlobal(commands.valid);
    await app.slash.deployGlobal(gamesCommands.valid);
    app.slash.listen();
});

app.connect();