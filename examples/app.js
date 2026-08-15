import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { SlashService, Application } from "disfox"

const client = new Client({
    intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers
        ]
})

const app = new Application({
    "client": client,
    "token": process.env.TK
})


const commands = await SlashService.extractDir('./examples/commands');
const gamesCommands = await SlashService.extractDir('./examples/games');

app.connect()

app.client.once(Events.ClientReady, async () => {
    console.log("Online")
    await app.slash.deployGlobal(commands.valid)
    app.slash.listen();
    await app.slash.deployGlobal(gamesCommands.valid)
})


