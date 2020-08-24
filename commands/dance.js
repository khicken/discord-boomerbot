module.exports = {
    name: 'dance',
    description: 'Watch me dance!',
    category: 'misc',
    cooldown: 1,
    execute(message, args) {
        message.channel.send('https://cdn.discordapp.com/attachments/652399495170228224/746202363496235098/taylor-disc.mp4');
    }
}