const Discord = require('discord.js'); // using discord js api
const bot = new Discord.Client();

const PREFIX = '%';
var VERSION = '1.0.1';

// boot up bot
bot.on('ready', () => {
    console.log(bot.user.username + ' is now online!');
    bot.user.setActivity('the world crumble', {
        type: 'WATCHING'
    }).catch(console.error);
});


// commands
bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(' '); // split message's content into array of strings
    switch(args[0]) {
        case 'ping':
            message.channel.send('pong!');
        break;
    }
});

// finish bot bootup process
bot.login(process.env.token);