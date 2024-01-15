import dotenv from "dotenv";
dotenv.config();
import { REST, Routes } from 'discord.js';

const commands = [
	{
		name: 'ruthere',
		description: '봇이 잘 작동하고 있는지 확인합니다.',
	},
	{
		name: 'lotto',
		description: '행운의 주인공을 뽑아요!',
	},
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_BOT_ID);

export const setSlashCommands = async () => {
	try {
		console.log('Registering slash commands... ');

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{
				body: commands
			}
		)
		console.log('Registered slash commands successfully');
		
	} catch (error) {
		console.log(error);
	}
};