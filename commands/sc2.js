exports.run = function(client, message, args) {

	//Get our API Token
	const blizzardapi = require('../settings.json').blizzardapi;
	var request =  require('request');

	var blizzardArray = {'kabobrocks'  : {'id':'3127195', 'username':'Kabobrocks'},
						 'muskratlove' : {'id':'2353905', 'username':'MuskratLord'},
						 'mykin'	   : {'id':'2660449', 'username':'Mykin'},
						 'spiv'		   : {'id': '704322', 'username':'Nuindil'}
	};

	var complete = false;
	if (args[1]) {
		var player = args[1].toLowerCase();
	}
	switch(args[0]) {
		case 'commands':
			complete = true;
			message.channel.send("These are my current Starcraft II commands:\n```achievements [username]: gives amount of achievements for the registered player\nplayers: lists all registered members\nrace [username]: lists players' primary race```")
		break;
		case 'players':
			complete = true;
			message.channel.send("These are the currently registered Starcraft II players:```\n" + Object.keys(blizzardArray) + "```");
		break;
	}
	if (blizzardArray[player]) {
		switch(args[0]) {
			case 'achievements':
				request({
					url: "https://us.api.battle.net/sc2/profile/" + blizzardArray[player]['id'] + "/1/" + blizzardArray[player]['username'] + "/?locale=en_US&apikey=" + blizzardapi,
					json: true
				}, function (error, response, body) {
					message.channel.send(args[1] + " has earned " + body['achievements']['points']['totalPoints'] + " achievement points in Starcraft II");
				})
				break;
			case 'race':
				request({
					url: "https://us.api.battle.net/sc2/profile/" + blizzardArray[player]['id'] + "/1/" + blizzardArray[player]['username'] + "/?locale=en_US&apikey=" + blizzardapi,
					json: true
				}, function (error, response, body) {
					message.channel.send("The primary race for " + args[1] + " is: " + body['career']['primaryRace']);
				})
				break;
			default:
				message.channel.send("Not a valid sc2 command");
			break;
		}
	} else {
		if (!complete) {
			if (args[1]) {
				message.channel.send("That user is not registered in my system for tracking Starcraft II. Please ask an admin to add them.");
			} else {
				message.channel.send("Not a valid sc2 command");
			}
		}
	}
};