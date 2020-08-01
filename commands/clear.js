module.exports = {
    name: 'clear',
    aliases: ['clr'],
    description: 'Removes a given number of messages.',
    usage: '<lines>',
    cooldown: 0,
    category: 'misc',
    execute(message, args) {
        if(!args[1]) return message.reply('Invalid argument.');
        message.channel.bulkDelete(args[1] + 1);
    }
}