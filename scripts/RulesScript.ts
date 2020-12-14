import DiscordBot from '../';
import Discord from 'discord.js';
import Config from 'config';

export default function(bot: DiscordBot) {
    console.log(`Loading Rules Script`);
    bot.addListener("messageReactionAdd", async (reaction: Discord.MessageReaction, user: Discord.User) => {
        const guild = reaction.message.guild;
        if (!guild) {
            // Guild only event.
            return;
        }
        
        if (reaction.message.channel.id === Config.get('rulesChannel')) {
            if (reaction.emoji.name === Config.get('acceptedEmoji')) {
                console.log(`${user.username} accepted the rules!`);

                const member = guild.member(user);
                if (!member) {
                    // Unknown member?!
                    return;
                }

                const role = await guild.roles.fetch(Config.get('acceptedRole'));

                if (!role) {
                    console.log(`Error applying role to ${user.username}, a role with the ID ${Config.get('acceptedRole')} doesn't exist!`);
                    return;
                }

                const hasRole = member.roles.cache.has(Config.get('acceptedRole'));
                if (!hasRole) {
                    guild.roles.fetch(Config.get('acceptedRole'));
                    try {
                        await member.roles.add(role);
                        user.send(`Thanks for acceping the rules in ${guild.name}`);
                    } catch (e) {
                        console.log(`Failed to add a role to ${user.username}`, e);
                        user.send(`Whoops! I failed to add the '${role.name}' role to you, contact staff please!`);
                    }
                }
            }
        }
    });
}