module.exports = {
    name: 'boomer',
    description: 'For debugging',
    category: 'misc',
    aliases: ['another-ping'],
    cooldown: 0,
    execute(message, args) {
        message.channel.send('hmnnnnn');
    }
}