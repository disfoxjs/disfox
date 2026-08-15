<p align="center">
  <a href="https://disfox.js.org">
    <img src="https://disfox.js.org/img/dfx-outline.png" width="500" />
  </a>
</p>

<p align="center">
  <strong>Build Discord apps faster, cleaner, and smarter.</strong>
</p>

<p align="center">
  <a href="https://discord.gg/UuZnAuhhP6">
    <img src="https://img.shields.io/badge/Community-Discord?logo=discord&labelColor=0D1117&color=5865F2">
  </a>
  <img src="https://img.shields.io/badge/Built%20with-Discord.js-00A8FF?labelColor=0D1117">
  <img src="https://img.shields.io/npm/v/disfox?labelColor=0D1117&color=3B82F6">
</p>

---

**Disfox** is a TypeScript-powered framework for **Discord.js**, designed to make application development faster, cleaner, and smarter.

With built-in automation, integrated services, and a modern architecture, Disfox reduces repetitive work so you can focus on building great Discord applications.

**Less boilerplate. More productivity. Unlimited possibilities.**

[See BehaviorTables](https://disfox.js.org) · [See SlashService](https://disfox.js.org)

### Install

`npm install disfox`  
`yarn add disfox`  
`pnpm add disfox`  
`bun add disfox`

## Compatibility

Disfox is currently **not compatible with CommonJS**.

Only ES Modules (ESM) are supported.

### Example usage

```js
import { SlashOptions, SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("ping1")
    .description("replies")
//  .mark(SlashTag.AdminOnly) // Optional method to enable command tags, defining behavior within the Discord API.
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

```js
import { Client, GatewayIntentBits, ActivityType, Events } from "discord.js";
import { Application, SlashService } from "disfox";

const client = new Client({
  intents: [GatewayIntentBits.MessageContent]
});

const app = new Application({
  token: process.env.TOKEN,
  client: client
});

await app.connect();

await app.actions.setPresence(
  ActivityType.Playing,
  "⭐ Ready! /help",
  "online"
);

app.client.on(Events.ClientReady, async () => {
  const command = await SlashService.extractFile("./commands/ping.js");

  await app.slash.deployGlobal([command]);

  app.slash.listen({
    onError: {
      message: "Error occurred. Try again later.",
      flags: 64
    }
  });
});
```

**Ready to build with Disfox? [Get Started →](https://disfox.js.org)**

### Explore Disfox

- [Official Documentation](https://disfox.js.org)
- [NPM Package](https://www.npmjs.com/package/disfox)
- [GitHub Repository](https://github.com/DisfoxJS/Disfox)
- [GitHub Wiki](https://github.com/DisfoxJS/Disfox/wiki/What-is-Disfox%3F)
- [Discord Community Server](https://discord.gg/UuZnAuhhP6)