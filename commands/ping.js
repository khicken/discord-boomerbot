module.exports = {
    name: 'ping',
    description: 'Ping me!',
    execute(message, args) {
        message.channel.send('pong!');
    }
}