<p align="center">
  <a href="https://disfox.js.org">
    <img src="https://disfox.js.org/img/dfx-outline.png" width="500" />
  </a>
</p>

<h2 align="center">
  Build applications with real organization and total flexibility.
</h2>

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
import { SlashService } from "disfox";

export const command = new SlashService.Command("ping")
    .description("Replies with Pong!🏓")
    .action(async interaction => {
        await interaction.reply("Pong!🏓");
    });
```

```js
import { Events } from "discord.js"
import { SlashService, Application} from "disfox"

const app = new Application("YOUR_TOKEN_HERE");

const commands = await SlashService.extractDir("./examples/commands");

app.client.once(Events.ClientReady, async () => {
    await app.slash.deployGlobal(commands.valid);
    app.slash.listen();
});

app.connect();
```

**Ready to build with Disfox? [Get Started →](https://disfox.js.org)**

### Explore Disfox

- [Official Documentation](https://disfox.js.org)
- [NPM Package](https://www.npmjs.com/package/disfox)
- [GitHub Repository](https://github.com/DisfoxJS/Disfox)
- [GitHub Wiki](https://github.com/DisfoxJS/Disfox/wiki/What-is-Disfox%3F)
- [Discord Community Server](https://discord.gg/UuZnAuhhP6)