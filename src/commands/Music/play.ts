import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { GuildMember } from 'discord.js';
import { Playlist, Song } from 'discord-music-player';

@ApplyOptions<CommandOptions>({
	name: 'play',
	runIn: ['GUILD_TEXT']
})
export class PlayCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		let queue = this.container.musicPlayer.createQueue(interaction.guild!.id);

		// get users voice channel
		let member = interaction.member!;
		if (!(!(member instanceof GuildMember) || member.partial)) {
			let voiceChannel = member.voice!.channel;
			if (!voiceChannel) return interaction.reply('You need to be in a voice channel to use this command.');

			await queue.join(voiceChannel);
		}

		let songToPlay = interaction.options.getString('songtoplay');
		let song: Song | Playlist;
		try {
			if (interaction.options.getBoolean('playlist')) {
				song = await queue.playlist(songToPlay!);
			} else song = await queue.play(songToPlay!);
		} catch (error) {
			return interaction.reply(`Could not play song: ${error}`);
		}

		if (typeof song === typeof Playlist) {
			return interaction.reply(`Added playlist [**${song.name}**](${song.url}) to the queue.`);
		}
		return interaction.reply(`Now playing: [${song.name}](${song.url})`);
	}

	registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(builder => {
			return builder.setName('play').setDescription('Plays a song.').addStringOption(option => {
				return option.setName('songtoplay').setDescription('The song to play.');
			}).addBooleanOption(option => {
				return option.setName('playlist').setDescription('Whether to treat as a playlist.');
			});
		},{ guildIds: ['561598333911826504'], idHints: ['959300756593344582']});
	}
}