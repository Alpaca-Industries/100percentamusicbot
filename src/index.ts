import './lib/setup';
import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import { Player } from 'discord-music-player';

const client = new SapphireClient({
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_VOICE_STATES',
	]
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');

		container.musicPlayer = new Player(client,{
			leaveOnEmpty: false,
		});
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();




declare module '@sapphire/pieces' {
	interface Container {
		musicPlayer: Player;
	}
}