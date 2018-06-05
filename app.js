const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;
const generalChannel = require('./settings.json').generalchannel;
require('./util/eventLoader')(client);

var prefix = "!";
var request =  require('request');

client.on('guildMemberAdd', member => {
	client.channels.get(generalChannel).send(`${member.user.username} has joined the server. Welcome!`);
});

client.on('guildMemberRemove', member => {
  client.channels.get(generalChannel).send(`${member.user.username} has left the server.`);
});


client.on('channelCreate', channel => {
	console.log(`A ${channel.type} channel by the name of ${channel.name} and was created at ${channel.createdAt} with the ID of ${channel.id}`);
	if (channel.type === 'text') {
		channel.sendMessage('Channel successfully created.');
		client.channels.get(generalChannel).send(`A new ${channel.type} channel, ${channel.name} has been created. Go check it out`);
	}
});

client.on('error', (error) => console.log(error));

client.login(token);
