const Discord = require('discord.js'); // using discord js api
const fs = require('fs'); // using filesystem lib
const client = new Discord.Client();

const PREFIX = 'boomer ';
const VERSION = '1.0.2';
const LAST_UPDATED = '8/4/20';

function returnUsage(cmdname, usage) {
    return `Invalid arguments; usage: \`${PREFIX}${cmdname} ${usage}\``;
}
var cmds = new Discord.Collection(), cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // filter files in commands directory
for(const file of commandFiles) { // using a filesystem to store individual commands
    let comm = require(`./commands/${file}`);
    cmds.set(comm.name, comm);
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
    if(!message.content.includes(PREFIX)) { return;}
    console.log('some command was called. . .and didnt die');
    const args = message.content.slice(PREFIX.length).trim().split(/ +/); // split message's content into array of strings
    const cmdName = args.shift().toLowerCase(); // set cmd as lowercase second argument of args arry (first arg is now removed)
    const cmd = cmds.get(cmdName); // || cmds.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmds.has(cmd)) {
        console.log("cmd list: " + cmds + "; command: " + cmd);
        // return; // if command not found, exit
    }
    
    if(!cooldowns.has(cmdName)) cooldowns.set(cmdName, new Discord.Collection()); // if cooldown not found, set the cooldown
    
    console.log('yeaaaaaaaaaaaaa');

    const now = Date.now();
    const timestamps = cooldowns.get(cmdName);
    let cooldownAmount = (cmd.cooldown || 3) * 1000;
    
    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmdName}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // execute command
    try {
        cmd.execute(message, args);
    } catch(error) {
        message.channel.send('There was an error trying to execute that command!');
        console.log('error detected: ' + error);
    }
});

client.login(process.env.token); // finish client bootup process
module.exports = { cmds, Discord, fs, client, VERSION, PREFIX, LAST_UPDATED, returnUsage } // export independent variables