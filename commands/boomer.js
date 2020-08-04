module.exports = {
    name: 'boomer',
    description: 'For debugging',
    category: 'misc',
    aliases: ['another-ping'],
    execute(message, args) {
        message.channel.send('hmnnnnn');
    }
}