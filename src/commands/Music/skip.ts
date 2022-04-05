import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	name: 'skip',
	runIn: ['GUILD_TEXT']
})
export class SkipCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		let queue = this.container.musicPlayer.getQueue(interaction.guild!.id);

		if (queue?.songs?.length === 0) {
			return interaction.reply('There are no songs in the queue!');
		}

		let skippedSong = await queue?.skip();
		return interaction.reply(`Skipped [**${skippedSong?.name}**](${skippedSong?.url})`);
	}

	registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(builder => {
			return builder.setName('skip').setDescription('Skips the current song.');
		},{ guildIds: ['561598333911826504'], idHints: ['959300342787473409']});
	}
}