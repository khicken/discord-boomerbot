const { Discord } = require("../main.js");
var { cmds, VERSION } = require("../main.js");

module.exports = {
    name: 'help',
    description: 'Display help commands',
    execute(message, args) {
        // making a rlly long string that contains all commands with name and desc. . .
        let cmdList = "";
        for(let[name, description] of cmds) {
            cmdList += name + ": " + description + "\n";
        }
        
        const embed = new Discord.MessageEmbed()
        .setTitle("Help Commands")
        .addField("Version", VERSION)
        .addField("General", cmdList);
        message.channel.send(embed);
    }
}