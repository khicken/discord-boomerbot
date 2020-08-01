module.exports = {
    name: 'ping',
    description: 'Ping me!',
    category: 'misc',
    execute(message, args) {
        message.channel.send('pong!');
    }
}