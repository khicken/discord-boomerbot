const Discord = require('discord.js'); // using discord js api
const fs = require('fs'); // using filesystem lib
const client = new Discord.Client();

const PREFIX = 'boomer ';
var VERSION = '1.0.2';
const LAST_UPDATED = '8/4/20';

// using a filesystem to store individual commands
var cmds = new Discord.Collection();
var cooldowns = new Discord.Collection();
module.exports = { cmds, Discord, fs, client, VERSION, PREFIX, LAST_UPDATED }
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // filter files in commands directory
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    cmds.set(command.name, command);
}
console.log(cmds);

// init boot
client.on('ready', () => {
    console.log(client.user.username + ' is now online!');
    client.user.setActivity('the US burn', {
        type: 'WATCHING'
    }).catch(console.error);
});

// commands
client.on('message', message => {
    if(!message.content.includes(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).split(/ +/); // split message's content into array of strings
    const cmdName = args.shift().toLowerCase(); // set cmd as lowercase second argument of args arry (first arg is now removed)
    const cmd = cmds.get(cmdName) || cmds.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmds.has(cmd)) return; // if command not found, exit

    // cooldown control
    if(!cooldowns.has(cmdName)) {
        cooldowns.set(cmdName, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(cmdName);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            // return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmdName}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // execute command
    try {
        cmd.execute(message, args);
    } catch (error) {
        message.channel.send('There was an error trying to execute that command!');
    }
});

// finish client bootup process
client.login(process.env.token);