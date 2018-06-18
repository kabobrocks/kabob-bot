exports.run = function(client, message, args) {

	//Get our API Token
	const gw2Array = require('../settings.json').gw2Array;
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
	if (gw2Array[player]) {
		switch(args[0]) {
			case 'characters':
				request({
					url: "https://api.guildwars2.com/v2/characters?page=0",
					headers: {
						"Authorization" : "Bearer " + gw2Array[player]
					},
					json: true
				}, function (error, response, body) {
					toReturn = '';
					console.log(error);
					for(i = 0; i < body.length; i++) {
						toReturn += "Name: " + body[i]['name'] + "\n";
						toReturn += "Race: " + body[i]['race'] + "\n";
						toReturn += "Gender: " + body[i]['gender'] + "\n";
						toReturn += "Level: " + body[i]['level'] + "\n";
						toReturn += "Profession: " + body[i]['profession'] + "\n";
						toReturn += "Deaths: " + body[i]['deaths'] + "\n";
						for(j = 0; j < body[i]['crafting'].length; j++) {
							toReturn += "Crafting: " + body[i]['crafting'][j]['discipline'] + " Level: " + body[i]['crafting'][j]['rating'] + "\n"
						}
						toReturn += "\n";
					}
					message.channel.send(toReturn);
				})			
				break;
			default:
				message.channel.send("Not a valid Guild Wars 2 command");
			break;
		}
	} else {
		if (!complete) {
			if (args[1]) {
				message.channel.send("That user is not registered in my system for tracking Guild Wars 2. Please ask an admin to add them.");
			} else {
				message.channel.send("Not a valid Guild Wars 2 command");
			}
		}
	}
};