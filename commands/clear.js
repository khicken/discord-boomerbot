module.exports = {
    name: 'clear',
    description: 'Removes a given number of messages.\nUsage: `boomer clear <lines>`',
    execute(message, args) {
        if(!args[1]) return message.reply('Invalid argument. For command help, type `boomer help`.');
        message.channel.bulkDelete(args[1] + 1);
    }
}