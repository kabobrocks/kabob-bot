const generalChannel = require('../settings.json').generalchannel;

exports.run = function(client, message, args) {
	message.channel.send(`Happy Birthday ` + args[0] + `!`);
	client.channels.get(generalChannel).send(`Happy Birthday ` + args[0] + `!`);
};