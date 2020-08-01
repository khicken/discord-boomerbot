module.exports = {
    name: 'kick',
    description: 'Kick someone from the server',
    cooldown: 5,
    category: 'user-management',
    usage: '<user>',
    execute(message, args) {
        message.channel.send('in wip');
    }
}