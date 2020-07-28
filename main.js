const Discord = require('discord.js'); // using discord js api
const bot = new Discord.Client();

const PREFIX = '%';

// init
bot.on('ready', () => {
    console.log(bot.user.username + " is now online!");
});
bot.login(process.env.token);
bot.user.setStatus("Being a boomer");

// commands
bot.on('message', message => {
    let args = message.content.substring(PREFIX).split(' '); // split message's content into array of strings
    switch(args[0]) {
        case 'ping':
            message.channel.send('pong!');
            break;
    }
});