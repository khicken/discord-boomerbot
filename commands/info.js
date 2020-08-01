const { VERSION, LAST_UPDATED } = require("../main.js");

module.exports = {
    name: 'info',
    description: 'Displays bot info',
    aliases: ['information', 'version'],
    cooldown: 1,
    category: 'misc',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Bot Info")
        .addField("General", data)
        .addField("Version", VERSION)
        .addField("Last Updated: ", LAST_UPDATED);
        message.channel.send(embed);
    }
}
        