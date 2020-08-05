module.exports = {
    name: 'ping',
    description: 'Ping me!',
    category: 'misc',
    cooldown: 1,
    execute(message, args) {
        message.channel.send('pong!');
    }
}