const { cmds, Discord, VERSION } = require("../main.js");

module.exports = {
    name: 'help',
    description: 'Display help commands',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Help Commands")
        .addField("Version", VERSION)
        .addField("General", cmds.forEach(function(name, description) {
            name + " " + description
        }));
        message.channel.send(embed);
    }
}