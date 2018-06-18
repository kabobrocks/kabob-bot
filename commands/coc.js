exports.run = function(client, message, args) {

	//Get our API Token
	const cocapi = require('../settings.json').cocapi;
	const cocArray = require('../settings.json').cocArray;
	var request =  require('request');

	var complete = false;
	if (args[1]) {
		var player = args[1].toLowerCase();
	}
	switch(args[0]) {
		case 'commands':
			complete = true;
			message.channel.send("These are my current Clash of Clans commands:\n```heroes [username]: lists heroes for the user\nplayers: lists all registered members\ntownhall [username]: retrieves town hall levels for that user\ntrophies [username]: retrieves trophy counts for that user```")
		break;
		case 'players':
			complete = true;
			message.channel.send("These are the currently registered Clash of Clans players:```\n" + Object.keys(cocArray) + "```");
		break;
	}
	if (cocArray[player]) {
		switch(args[0]) {
			case 'heroes':
				request({
					url: "https://api.clashofclans.com/v1/players/%23" + cocArray[player],
					headers: {
						"Authorization" : "Bearer " + cocapi
					},
					json: true
				}, function (error, response, body) {
					toReturn = '';
					for (i=0; i < body['heroes'].length; i++) {
						toReturn += body['heroes'][i]['name'] + ": **" + body['heroes'][i]['level'] + "**\n"
					}
					message.channel.send(toReturn);
				})			
				break;
			case 'townhall':
				request({
					url: "https://api.clashofclans.com/v1/players/%23" + cocArray[player],
					headers: {
						"Authorization" : "Bearer " + cocapi
					},
					json: true
				}, function (error, response, body) {
					message.channel.send("Town Hall: **" + body['townHallLevel'] + "** Builder Hall: **" + body['builderHallLevel'] + "**");
				})
				break;
			case 'trophies':
				request({
					url: "https://api.clashofclans.com/v1/players/%23" + cocArray[player],
					headers: {
						"Authorization" : "Bearer " + cocapi
					},
					json: true
				}, function (error, response, body) {
					message.channel.send("Current Trophies: **" + body['trophies'] + "** Highest Trophies: **" + body['bestTrophies'] + "**\nCurrent Versus Trophies: **" + body['versusTrophies'] + "** Highest Versus Trophies: **" + body['bestVersusTrophies'] + "**");
				})
				break;
			default:
				message.channel.send("Not a valid Clash of Clans command");
			break;
		}
	} else {
		if (!complete) {
			if (args[1]) {
				message.channel.send("That user is not registered in my system for tracking Diablo 3. Please ask an admin to add them.");
			} else {
				message.channel.send("Not a valid Clash of Clans command");
			}
		}
	}
};