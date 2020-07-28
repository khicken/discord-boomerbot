const Discord = require('discord.js'); // using discord js api
const fs = require('fs'); // using filesystem lib
const bot = new Discord.Client();

const PREFIX = 'boomer ';
var VERSION = '1.0.1';

// using a filesystem to store individual commands


// init boot
bot.on('ready', () => {
    console.log(bot.user.username + ' is now online!');
    bot.user.setActivity('the world crumble', {
        type: 'WATCHING'
    }).catch(console.error);
});

// commands
bot.on('message', message => {
    let args = message.content.toLowerCase().substring(PREFIX.length).split(' '); // split message's content into array of strings
    switch(args[0]) {
        case 'ping':
            message.channel.send('Pong');
        break;
        case 'clr': case 'clear':
            if(!args[1]) return message.reply('Invalid argument. For command help, type `boomer help`.');
            message.channel.bulkDelete(args[1]);
        break;
        case 'qotd':
            message.channel.send('wip lol');
        break;
        case 'help':
            message.channel.send("```I'm a boomer.\nTest, test, test\nI need to somehow put a list of helpful commands```");
        break;
        case 'die':
            message.channel.send("no u");
        default:
            // message.channel.send('not a command lol');
        break;
    }
});

// finish bot bootup process
bot.login(process.env.token);