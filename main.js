const Discord = require('discord.js'); // using discord js api
const fs = require('fs'); // using filesystem lib
const client = new Discord.Client();

const PREFIX = 'boomer ';
var VERSION = '1.0.2';

// using a filesystem to store individual commands
var cmds = new Discord.Collection();
module.exports = {
    cmds, Discord, fs, client, VERSION
}
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // filter files in commands directory
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    cmds.set(command.name, command);
}

// init boot
client.on('ready', () => {
    console.log(client.user.username + ' is now online!');
    client.user.setActivity('the world crumble', {
        type: 'WATCHING'
    }).catch(console.error);
});

// commands
client.on('message', message => {
    if(!message.content.includes(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).split(/ +/); // split message's content into array of strings
    const cmd = args.shift().toLowerCase(); // set cmd as lowercase second argument of args arry (first arg is now removed)

    if (!cmds.has(cmd)) return; // if command not found, exit

    try {
        cmds.get(cmd).execute(message, args);
    } catch (error) {
        message.channel.send('There was an error trying to execute that command!');
    }
});

// finish client bootup process
client.login(process.env.token);