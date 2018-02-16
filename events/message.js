const settings = require('../settings.json');
var prefix = "!";

module.exports = message => {
	const client = message.client;

	//Don't do anything unless it starts with our prefix
	if (!message.content.startsWith(prefix)) return;

	//don't let bots interact with eachother
	if (message.author.bot) return;

	//grab the arguments if we need them
	var args = message.content.split(' ').slice(1);
	var command = message.content.split(' ')[0];
	command = command.substr(1);

	try {
		let cmdFile = require(`../commands/${command}`);
		cmdFile.run(client, message, args);
	} catch (err) {
		console.log(`Command ${command} failed\n${err.stack}`);
		message.channel.send("That command does not exist");
	}
};