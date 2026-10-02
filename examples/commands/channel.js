import { ChannelType } from "discord.js";
import {
    SlashService,
    SlashOptions
} from "disfox";

// Creates a channel option for the slash command.
const channelOption = new SlashService.Option("channel")
    .type(SlashOptions.Channel)
    .description("Select a channel")
    .required(true);

// Restricts the option to specific Discord channel types.
channelOption.channelTypes(
    ChannelType.GuildText,
    ChannelType.GuildVoice,
    ChannelType.GuildForum
);

// Creates the slash command and attaches the channel option.
const command = new SlashService.Command("channel")
    .description("Tests a channel option")
    .option(channelOption)
    .action(async interaction => {
        // Retrieves the selected channel.
        const channel = interaction.options.getChannel("channel", true);

        // Replies with information about the selected channel.
        await interaction.reply(
            `Selected channel: ${channel.name} (${channel.id})`
        );
    });

export default command;

/**
 * Copyright (c) 2026 Disfox
 *
 * Licensed under the MIT License.
 * See the LICENSE file for more information.
 */