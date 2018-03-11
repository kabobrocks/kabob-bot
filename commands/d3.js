exports.run = function(client, message, args) {

	//Get our API Token
	const blizzardapi = require('../settings.json').blizzardapi;
	const diabloArray = require('../settings.json').diabloArray;
	var request =  require('request');

	var complete = false;
	if (args[1]) {
		var player = args[1].toLowerCase();
	}
	switch(args[0]) {
		case 'commands':
			complete = true;
			message.channel.send("These are my current Diablo 3 commands:\n```heroes [username]: lists characters for that user\nparagon [username]: retrieves paragon level for that user\nplayers: lists all registered members```")
		break;
		case 'players':
			complete = true;
			message.channel.send("These are the currently registered Diablo 3 players:```\n" + Object.keys(diabloArray) + "```");
		break;
	}
	if (diabloArray[player]) {
		switch(args[0]) {
			case 'heroes':
				request({
					url: "https://us.api.battle.net/d3/profile/" + diabloArray[player]['username'] + "%23" + diabloArray[player]['id'] + "/?locale=en_US&apikey=" + blizzardapi,
					json: true
				}, function (error, response, body) {
					var numHeroes = body['heroes'].length;

					var toReturn = '';
					for (i = 0; i < numHeroes; i++) {
						toReturn += "**Name:** " + body['heroes'][i]['name'] + "\n";
						toReturn += "**Class:** " + body['heroes'][i]['class'] + "\n";
						toReturn += "**Level:** " + body['heroes'][i]['level'] + "\n";
						toReturn += "**Elite Kills:** " + body['heroes'][i]['kills']['elites'] + "\n";
						toReturn += "**Hardcore?:** " + body['heroes'][i]['hardcore'] + "\n";
						toReturn += "**Seasonal?:** " + body['heroes'][i]['seasonal'] + "\n\n";
					}
					message.channel.send(toReturn);
				})
				break;
			case 'paragon':
				request({
					url: "https://us.api.battle.net/d3/profile/" + diabloArray[player]['username'] + "%23" + diabloArray[player]['id'] + "/?locale=en_US&apikey=" + blizzardapi,
					json: true
				}, function (error, response, body) {
					message.channel.send(args[1] + " has achieved Paragon Level " + body['paragonLevel']);
				})
				break;
			default:
				message.channel.send("Not a valid sc2 command");
			break;
		}
	} else {
		if (!complete) {
			if (args[1]) {
				message.channel.send("That user is not registered in my system for tracking Diablo 3. Please ask an admin to add them.");
			} else {
				message.channel.send("Not a valid d3 command");
			}
		}
	}
};