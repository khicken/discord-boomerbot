const Discord = require('discord.js'); // using discord js api
const fs = require('fs'); // using filesystem lib
const bot = new Discord.Client();

const PREFIX = 'boomer ';
var VERSION = '1.0.2';

// using a filesystem to store individual commands
var cmds = new Discord.Collection();
module.exports = {
    cmds, Discord, fs, bot, VERSION
}
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // filter files in commands directory
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    cmds.set(command.name, command);
}

// init boot
bot.on('ready', () => {
    console.log(bot.user.username + ' is now online!');
    bot.user.setActivity('the world crumble', {
        type: 'WATCHING'
    }).catch(console.error);
});

// commands
bot.on('message', message => {
    if(!message.content.includes(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).split(/ +/); // split message's content into array of strings
    const cmd = args.shift().toLowerCase();

    for(let[name] of cmds) {
        cmds.get(name).execute(message, args);
    }

    // switch(args[0]) {
    //     case 'ping':
    //         message.channel.send('Pong');
    //     break;
    //     case 'clr': case 'clear':
    //         if(!args[1]) return message.reply('Invalid argument. For command help, type `boomer help`.');
    //         message.channel.bulkDelete(args[1]);
    //     break;
    //     case 'qotd':
    //         message.channel.send('wip lol');
    //     break;
    //     case 'help':
    //         message.channel.send("```I'm a boomer.\nTest, test, test\nI need to somehow put a list of helpful commands```");
    //     break;
    //     case 'die':
    //         message.channel.send("no u");
    //     default:
    //         // message.channel.send('not a command lol');
    //     break;
    // }
});

// finish bot bootup process
bot.login(process.env.token);