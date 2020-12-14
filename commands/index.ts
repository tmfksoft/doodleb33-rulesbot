import { GuildChannel, VoiceChannel } from 'discord.js';
import DiscordBot from '../';
import Config from 'config';

export default (bot: DiscordBot) => {
    
    // Define the help command.
    bot.registerCommand({
        name: "help",
        description: "Displays information on using the bot",
        handler: (args, author, message) => {
            console.log(`Help command triggered!`);
            message.reply(`Hey ${author.username}, I'm a simple chat bot that can perform various actions!`);

            message.channel.send(`I have some commands:`);
            const commands = bot.getCommands();
            for (let commandName of Object.keys(commands)) {
                const command = commands[commandName];
                message.channel.send(`${Config.get('commandTrigger')}${commandName} - ${command.description}`);
            }

            return true;
        }
    });

    /*
    bot.registerCommand({
        name: "invite",
        description: "Get an invite link to add the bot to your server!",
        handler: (args, author, msg) => {
            msg.reply(`Add me with this link: https://discord.com/api/oauth2/authorize?client_id=${Config.get('client_id')}&permissions=${Config.get('permissions')}&scope=bot`);
            return true;
        }
    });
    */

}