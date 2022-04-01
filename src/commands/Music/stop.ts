import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	name: 'stop',
	runIn: ['GUILD_TEXT']
})
export class StopCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		let queue = this.container.musicPlayer.getQueue(interaction.guild!.id);

		await queue?.stop();
		return interaction.reply(`Goodbye, have a nice day!`);
	}

	registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(builder => {
			return builder.setName('stop').setDescription('Stops the current song.');
		},{ guildIds: ['561598333911826504'], idHints: ['959300342976225281']});
	}
}