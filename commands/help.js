const { cmds, Discord, PREFIX, client } = require("../main.js");

module.exports = {
    name: 'help',
    description: 'Displays help commands or give info about a specific command',
    aliases: ['commands'],
    usage: '<command name>',
    category: 'misc',
    cooldown: 3,
    execute(message, args) {
        const embed = new Discord.MessageEmbed().setColor('#0099ff');
        
        if(!args.length) {
            const miscCmds = "", userManagementCmds = "";
            for(const command of cmds) {
                if(cmds.category == 'misc') {
                    miscCmds += cmds.get(command).name + "\n";
                } else if(cmds.category == 'user-management') {
                    userManagementCmds += cmds.get(command).name + "\n";
                }
            }

            embed.setTitle('Boomer Bot Command List')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(`Here's a list of what I can do\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command!\n`)
            .setThumbnail(client.user.avatarURL)
            .addFields(
                { name: 'General Commands', value: miscCmds, inline: true },
                { name: 'User management', value: userManagementCmds, inline: true },
            )
            .setTimestamp()
            .setFooter('Boomer Bot by Khicken', 'https://avatars2.githubusercontent.com/u/39206468?s=460&u=d874967b4da2650fa907da08183b39a3f7788acb&v=4');
            return message.channel.send(embed);
        }

        const cmdName = args.toLowerCase(); // set cmd as lowercase second argument of args arry (first arg is now removed)
        const cmd = cmds.get(cmdName) || cmds.find(c => c.aliases && c.aliases.includes(cmdName));

        if(!cmd) return message.channel.send("Invalid command!");

        embed.setTitle('Command Help: ' + `\`${cmd.name}\``).setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        if(cmd.description) embed.setDescription(cmd.description);
        if(cmd.aliases) embed.addField("Aliases", cmd.aliases.join(', '), true);
        if(cmd.cooldown) embed.addField("Cooldown", `${cmd.cooldown}s`, true);
        if(cmd.usage) embed.addField("Usage", `\`${PREFIX}${cmd.name} ${cmd.usage}\``, false);
        else embed.addField("Usage", `\`${PREFIX}${cmd.name}\``, false);

        embed.setTimestamp()
        .setFooter('Boomer Bot by Khicken', 'https://avatars2.githubusercontent.com/u/39206468?s=460&u=d874967b4da2650fa907da08183b39a3f7788acb&v=4');
    }
}