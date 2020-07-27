const Discord = require('discord.js'); // using discord js api
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log(bot.user.username + " is now online");
});
bot.login(process.env.token);