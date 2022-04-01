import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { GuildMember } from 'discord.js';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';

@ApplyOptions<CommandOptions>({
	name: 'queue',
	runIn: ['GUILD_TEXT']
})
export class QueueCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		let queue = this.container.musicPlayer.createQueue(interaction.guild!.id);

		// get users voice channel
		let member = interaction.member!;
		if (!(!(member instanceof GuildMember) || member.partial)) {
			let voiceChannel = member.voice!.channel;
			if (!voiceChannel) return interaction.reply('You need to be in a voice channel to use this command.');

			await queue.join(voiceChannel);
		}

		const paginatedEmbed = new PaginatedMessage();
		paginatedEmbed.addPageEmbed(embed => {
			return embed
				.setTitle('Playlist')
				.setDescription(
					queue.songs.map(song => `[**${song.name}**](${song.url})`).join('\n')
				);
		});
		return paginatedEmbed.run(interaction);
	}

	registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(builder => {
			return builder.setName('queue').setDescription('Shows the current queued songs.');
		},{ guildIds: ['561598333911826504'], idHints: ['959298884159570001']});
	}
}