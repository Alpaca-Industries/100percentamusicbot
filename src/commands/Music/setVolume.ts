import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	name: 'setVolume',
	runIn: ['GUILD_TEXT']
})
export class SetVolumeCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		let queue = this.container.musicPlayer.getQueue(interaction.guild!.id);

		let newVolume = interaction.options.getInteger('volume');

		if (newVolume != null) queue?.setVolume(newVolume);

		return interaction.reply(`Set the volume to ${queue?.volume}%`);
	}

	registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(builder => {
			return builder.setName('setvolume').setDescription('Sets the volume of the song(s).').addIntegerOption(option => {
				return option.setName('volume').setDescription('The volume to set the player to.').setMinValue(0).setMaxValue(100);
			});
		},{ guildIds: ['561598333911826504'], idHints: ['959300342267404288']});
	}
}