import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	name: 'clearQueue',
	runIn: ['GUILD_TEXT']
})
export class ClearQueueCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		let queue = this.container.musicPlayer.getQueue(interaction.guild!.id);

		queue?.clearQueue();
		return interaction.reply('Queue cleared.');
	}

	registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(builder => {
			return builder.setName('clearqueue').setDescription('Clears the queue of song(s) to play.')
		},{ guildIds: ['561598333911826504'], idHints: ['959300341319475249']});
	}
}